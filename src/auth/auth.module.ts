import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwtConfig';
import { AuthGuard } from './auth.guard';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConfig), RolesModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
