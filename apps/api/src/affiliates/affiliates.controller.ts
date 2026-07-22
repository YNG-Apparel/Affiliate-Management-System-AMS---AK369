import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AffiliatesService } from './affiliates.service';
import { ListAffiliatesDto } from './dto/list-affiliates.dto';
import { RejectAffiliateDto } from './dto/reject-affiliate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser, type AuthUser } from '../auth/decorators/current-user.decorator';
import { RoleId } from '../auth/roles.constant';

// Every route here requires a valid token AND a Manager/Super Admin role.
@ApiTags('affiliates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleId.SUPER_ADMIN, RoleId.MANAGER)
@Controller('affiliates')
export class AffiliatesController {
  constructor(private readonly affiliates: AffiliatesService) {}

  @Get()
  @ApiOperation({ summary: 'List affiliates with search, filters, and pagination' })
  list(@Query() query: ListAffiliatesDto) {
    return this.affiliates.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one affiliate by id' })
  findOne(@Param('id') id: string) {
    return this.affiliates.findOne(id);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a pending affiliate' })
  approve(@Param('id') id: string, @CurrentUser() manager: AuthUser) {
    return this.affiliates.approve(id, manager.id);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a pending affiliate' })
  reject(@Param('id') id: string, @Body() dto: RejectAffiliateDto) {
    return this.affiliates.reject(id, dto.reason);
  }

  @Patch(':id/suspend')
  @ApiOperation({ summary: 'Suspend an active affiliate' })
  suspend(@Param('id') id: string) {
    return this.affiliates.suspend(id);
  }

  @Patch(':id/reactivate')
  @ApiOperation({ summary: 'Reactivate a suspended affiliate' })
  reactivate(@Param('id') id: string) {
    return this.affiliates.reactivate(id);
  }

  @Patch(':id/reapply')
  @ApiOperation({ summary: 'Resubmit a rejected (inactive) affiliate for reconsideration' })
  reapply(@Param('id') id: string) {
    return this.affiliates.reapply(id);
  }
}
