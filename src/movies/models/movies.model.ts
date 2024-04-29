import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Genr } from '../../genrs/models/genrs.models';

interface MovieAttributes {
  id: number;
  title: string;
  rating: number | null;
  isActive: boolean;
}

@Table
export class Movie extends Model<MovieAttributes, CreateMovieDto> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ allowNull: true, type: DataType.FLOAT })
  rating: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(() => Genr, () => MoviesGenrs)
  genrs: Genr[];
}

@Table
export class MoviesGenrs extends Model {
  @ForeignKey(() => Genr)
  genrId: number;

  @ForeignKey(() => Movie)
  movieId: number;
}
