import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ListAffiliatesDto } from './dto/list-affiliates.dto';

// Affiliate row joined with the data the admin table needs to show.
const affiliateInclude = {
  user: { select: { id: true, fullName: true, email: true, status: true, createdAt: true } },
  tier: { select: { id: true, name: true, multiplier: true } },
  city: { select: { id: true, name: true } },
} satisfies Prisma.AffiliateInclude;

@Injectable()
export class AffiliatesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListAffiliatesDto) {
    const { search, status, cityId, tierId, page, pageSize } = query;

    const where: Prisma.AffiliateWhereInput = {
      ...(cityId ? { cityId } : {}),
      ...(tierId ? { tierId } : {}),
      ...(status ? { user: { is: { status } } } : {}),
      ...(search
        ? {
            OR: [
              { affiliateCode: { contains: search, mode: 'insensitive' } },
              { user: { is: { fullName: { contains: search, mode: 'insensitive' } } } },
              { user: { is: { email: { contains: search, mode: 'insensitive' } } } },
            ],
          }
        : {}),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.affiliate.count({ where }),
      this.prisma.affiliate.findMany({
        where,
        include: affiliateInclude,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      data,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  async findOne(id: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id },
      include: { ...affiliateInclude, bank: { select: { id: true, name: true } } },
    });
    if (!affiliate) {
      throw new NotFoundException('Affiliate not found');
    }
    return affiliate;
  }

  /** Approve a pending affiliate: activate the user and stamp who/when. */
  async approve(id: string, managerId: string) {
    const affiliate = await this.requireWithUser(id);
    if (affiliate.user.status !== UserStatus.PENDING) {
      throw new BadRequestException('Only pending affiliates can be approved');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: affiliate.userId }, data: { status: UserStatus.ACTIVE } }),
      this.prisma.affiliate.update({
        where: { id },
        data: { joinedAt: new Date(), approvedById: managerId },
      }),
    ]);

    return this.findOne(id);
  }

  /** Reject a pending affiliate. */
  async reject(id: string, reason?: string) {
    const affiliate = await this.requireWithUser(id);
    if (affiliate.user.status !== UserStatus.PENDING) {
      throw new BadRequestException('Only pending affiliates can be rejected');
    }

    await this.prisma.user.update({
      where: { id: affiliate.userId },
      data: { status: UserStatus.INACTIVE },
    });

    void reason; // reason will be persisted once notifications/audit log exist (Phase 6)
    return this.findOne(id);
  }

  /** Suspend an active affiliate. */
  async suspend(id: string) {
    const affiliate = await this.requireWithUser(id);
    if (affiliate.user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException('Only active affiliates can be suspended');
    }

    await this.prisma.user.update({
      where: { id: affiliate.userId },
      data: { status: UserStatus.SUSPENDED },
    });

    return this.findOne(id);
  }

  /** Reactivate a suspended affiliate. */
  async reactivate(id: string) {
    const affiliate = await this.requireWithUser(id);
    if (affiliate.user.status !== UserStatus.SUSPENDED) {
      throw new BadRequestException('Only suspended affiliates can be reactivated');
    }

    await this.prisma.user.update({
      where: { id: affiliate.userId },
      data: { status: UserStatus.ACTIVE },
    });

    return this.findOne(id);
  }

  /** Resubmit a rejected (INACTIVE) affiliate back to PENDING for reconsideration. */
  async reapply(id: string) {
    const affiliate = await this.requireWithUser(id);
    if (affiliate.user.status !== UserStatus.INACTIVE) {
      throw new BadRequestException('Only rejected (inactive) affiliates can be resubmitted');
    }

    await this.prisma.user.update({
      where: { id: affiliate.userId },
      data: { status: UserStatus.PENDING },
    });

    return this.findOne(id);
  }

  private async requireWithUser(id: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id },
      include: { user: { select: { id: true, status: true } } },
    });
    if (!affiliate) {
      throw new NotFoundException('Affiliate not found');
    }
    return affiliate;
  }
}
