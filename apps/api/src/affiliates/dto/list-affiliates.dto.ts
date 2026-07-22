import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';

/**
 * Query params for the affiliate list: search + filters + pagination.
 * All optional — an empty query returns the first page of everyone.
 */
export class ListAffiliatesDto {
  @ApiPropertyOptional({ description: 'Search by name, email, or affiliate code' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: UserStatus, description: 'Filter by account status' })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({ description: 'Filter by city id' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ description: 'Filter by tier id' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  tierId?: number;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number = 20;
}
