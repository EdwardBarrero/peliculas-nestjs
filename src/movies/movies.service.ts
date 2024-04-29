import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models/movies.model';
import { Genr } from '../genrs/models/genrs.models';
import { Op } from 'sequelize';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieModel: typeof Movie) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.movieModel.create(createMovieDto);
    await this.associateGenrs(movie, createMovieDto.genrs);
    return movie;
  }

  findAll() {
    const movies = this.movieModel.findAll({});
    return movies;
  }

  findOne(id: number) {
    const movie = this.movieModel.findByPk(id, {
      include: { model: Genr, through: { attributes: [] } },
    });
    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.movieModel.update(updateMovieDto, { where: { id } });
    return movie;
  }

  async remove(id: number) {
    const movie = this.movieModel.update(
      { isActive: false },
      { where: { id } },
    );
    const movieInstance = await this.findOne(id);
    movieInstance && this.deleteAssociatedGenrs(movieInstance);
    return movie;
  }

  deleteAssociatedGenrs(movie: Movie) {
    if (movie.genrs?.length > 0) {
      movie.genrs.forEach(async (genr) => {
        await genr.$remove('movies', movie);
      });
    }
  }

  async associateGenrs(movie: Movie, genrsIds: number[] | undefined) {
    if (!genrsIds) return;
    this.deleteAssociatedGenrs(movie);
    const genres = await Genr.findAll({
      where: {
        isActive: true,
        id: {
          [Op.or]: genrsIds,
        },
      },
      attributes: ['id'],
    });
    await movie.$set('genrs', genres);
  }
}
