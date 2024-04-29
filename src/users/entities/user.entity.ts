import { Table, Column, Model } from 'sequelize-typescript';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindOptions } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

@Table
export class User extends Model<UserAttributes, CreateUserDto> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column
  password: string;
}

export class FilterUserDto implements FindOptions<User> {}
