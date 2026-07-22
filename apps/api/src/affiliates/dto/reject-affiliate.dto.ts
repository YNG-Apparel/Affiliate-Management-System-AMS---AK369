import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RejectAffiliateDto {
  @ApiPropertyOptional({ description: 'Optional reason shown to the affiliate' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
