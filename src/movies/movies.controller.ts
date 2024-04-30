import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { I18nContext, I18n } from 'nestjs-i18n';
import { PermitModulesGuard, PermitActionsGuard } from 'src/roles/roles.guard';
import { ModulePermits, PermitActions } from 'src/roles/roles.decorator';
import {
  PermitModulesEnum,
  PermitActionsEnum,
} from 'src/roles/roles.interface';

@ApiTags('movies')
@Controller('movies')
@ModulePermits(PermitModulesEnum.Movies)
@UseGuards(AuthGuard, PermitModulesGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @PermitActions(PermitActionsEnum.Create)
  @UseGuards(PermitActionsGuard)
  @ApiCreatedResponse({ type: CreateMovieDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @PermitActions(PermitActionsEnum.Read)
  @UseGuards(PermitActionsGuard)
  @ApiResponse({ status: 200, type: CreateMovieDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @PermitActions(PermitActionsEnum.Read)
  @UseGuards(PermitActionsGuard)
  @ApiResponse({ status: 200, type: CreateMovieDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    const movie = await this.moviesService.findOne(+id);
    if (!movie)
      throw new NotFoundException(i18n.t('common.movies.find-one.not-found'));
    return movie;
  }

  @Patch(':id')
  @PermitActions(PermitActionsEnum.Update)
  @UseGuards(PermitActionsGuard)
  @ApiResponse({ status: 200, type: CreateMovieDto })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @PermitActions(PermitActionsEnum.Delete)
  @UseGuards(PermitActionsGuard)
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
