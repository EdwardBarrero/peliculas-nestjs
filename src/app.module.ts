import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenrsModule } from './genrs/genrs.module';
import { sequelizeConfig } from './config/sequelizeConfig';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      synchronize: true,
      autoLoadModels: true,
    }),
    MoviesModule,
    GenrsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
