import { Body, Param, NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { I18nContext, I18n } from 'nestjs-i18n';
import { PermitModulesEnum } from 'src/roles/roles.interface';
import {
  ControllerProtected,
  PostProtected,
  GetProtectedList,
  GetProtectedRetrieve,
  PutProtected,
  DeleteProtected,
} from 'src/global/decorators/endpoint.decorator';

@ControllerProtected(PermitModulesEnum.Movies, 'movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @PostProtected(CreateMovieDto)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @GetProtectedList(CreateMovieDto)
  findAll() {
    return this.moviesService.findAll();
  }

  @GetProtectedRetrieve(':id', CreateMovieDto)
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    const movie = await this.moviesService.findOne(+id);
    if (!movie)
      throw new NotFoundException(i18n.t('common.movies.find-one.not-found'));
    return movie;
  }

  @PutProtected(':id', CreateMovieDto)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @DeleteProtected(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
