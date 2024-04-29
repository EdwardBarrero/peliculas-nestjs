import { Injectable } from '@nestjs/common';
import { CreateGenrDto } from './dto/create-genr.dto';
import { UpdateGenrDto } from './dto/update-genr.dto';
import { Genr } from './models/genrs.models';
import { Movie } from '../movies/models/movies.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GenrsService {
  constructor(@InjectModel(Genr) private genrsModel: typeof Genr) {}

  create(createGenrDto: CreateGenrDto) {
    const genr = this.genrsModel.create(createGenrDto);
    return genr;
  }

  findAll() {
    const genrs = this.genrsModel.findAll({ where: { isActive: true } });
    return genrs;
  }

  findOne(id: number) {
    const genr = this.genrsModel.findByPk(id, {
      include: { model: Movie, through: { attributes: [] } },
    });
    return genr;
  }

  update(id: number, updateGenrDto: UpdateGenrDto) {
    const genr = this.genrsModel.update(updateGenrDto, { where: { id } });
    return genr;
  }

  remove(id: number) {
    const genr = this.genrsModel.update({ isActive: false }, { where: { id } });
    return genr;
  }
}
