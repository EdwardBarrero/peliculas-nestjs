import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie, MoviesGenrs } from './models/movies.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([Movie, MoviesGenrs]), RolesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
