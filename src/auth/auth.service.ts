import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'src/config/encryptConfig';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string } | string> {
    const user = await this.userService.getAllAuthUserData(username);
    if (!user) return 'user not found';
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const payload: UserJwtPayload = {
      sub: user.id,
      username: user.username,
      userInfo: user,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
