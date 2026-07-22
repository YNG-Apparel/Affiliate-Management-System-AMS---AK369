import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from '@prisma/client';
import * as argon2 from 'argon2';
import { randomBytes } from 'node:crypto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RoleId } from './roles.constant';

export type SafeUser = Omit<User, 'passwordHash'>;

export interface AuthResponse {
  accessToken: string;
  user: SafeUser;
}

const STARTER_TIER_ID = 1;

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Public sign-up: creates a PENDING affiliate account awaiting manager approval.
   * No token is issued — the user cannot log in until approved (see login()).
   */
  async register(dto: RegisterDto): Promise<{ user: SafeUser; message: string }> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    // A city is required on the affiliate record; assign a default the manager can change.
    const defaultCity = await this.prisma.city.findFirst({
      where: { isActive: true },
      orderBy: { code: 'asc' },
    });
    if (!defaultCity) {
      throw new BadRequestException('No city configured. Please contact an administrator.');
    }

    const passwordHash = await argon2.hash(dto.password);
    const affiliateCode = `AFF-${randomBytes(4).toString('hex').toUpperCase()}`;

    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        passwordHash,
        status: UserStatus.PENDING,
        role: { connect: { id: RoleId.AFFILIATE } },
        affiliate: {
          create: {
            affiliateCode,
            tier: { connect: { id: STARTER_TIER_ID } },
            city: { connect: { id: defaultCity.id } },
          },
        },
      },
    });

    return {
      user: this.sanitize(user),
      message: 'Registration submitted. Awaiting manager approval.',
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.users.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await argon2.verify(user.passwordHash, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    await this.users.updateLastLogin(user.id);
    return this.buildAuthResponse(user);
  }

  private async buildAuthResponse(user: User): Promise<AuthResponse> {
    const payload = { sub: user.id, email: user.email, roleId: user.roleId };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken, user: this.sanitize(user) };
  }

  private sanitize(user: User): SafeUser {
    const { passwordHash, ...safe } = user;
    void passwordHash;
    return safe;
  }
}
