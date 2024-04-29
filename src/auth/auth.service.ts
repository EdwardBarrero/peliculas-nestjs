import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'src/config/encryptConfig';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

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
    const users = await this.userService.findAll({ where: { username } });
    if (!users?.length) return 'user not found';
    const user = users[0];
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
