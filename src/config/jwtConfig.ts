// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { JwtModuleOptions } from '@nestjs/jwt';

export const { JWT_SECRET } = process.env;

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '1d' },
};
