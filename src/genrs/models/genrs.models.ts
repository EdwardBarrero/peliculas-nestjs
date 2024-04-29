import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { CreateGenrDto } from '../dto/create-genr.dto';
import { Movie, MoviesGenrs } from '../../movies/models/movies.model';

interface GenrAttributes {
  id: number;
  name: string;
  isActive: boolean;
}

@Table
export class Genr extends Model<GenrAttributes, CreateGenrDto> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(() => Movie, () => MoviesGenrs)
  movies: Movie[];
}
