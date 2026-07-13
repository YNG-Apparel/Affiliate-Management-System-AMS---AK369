import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RoleId } from './roles.constant';

export type SafeUser = Omit<User, 'passwordHash'>;

export interface AuthResponse {
  accessToken: string;
  user: SafeUser;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.users.create({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash,
      // TODO(Phase 2): default to PENDING and require manager approval before activation.
      status: UserStatus.ACTIVE,
      role: { connect: { id: RoleId.AFFILIATE } },
    });

    return this.buildAuthResponse(user);
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
