import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie, MoviesGenrs } from './models/movies.model';

@Module({
  imports: [SequelizeModule.forFeature([Movie, MoviesGenrs])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
