import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenrsModule } from './genrs/genrs.module';
import { sequelizeConfig } from './config/sequelizeConfig';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
// import { i18nConfig } from './config/i18nConfig';
import { RolesModule } from './roles/roles.module';
import { PermitModulesModule } from './permit-modules/permit-modules.module';
import { PermitsModule } from './permits/permits.module';
import * as path from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    MoviesModule,
    GenrsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PermitModulesModule,
    PermitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
