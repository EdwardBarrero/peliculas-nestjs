import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindOptions } from 'sequelize';
import { Role, RoleAttributes } from 'src/roles/entities/roles.entity';
import { IPermitModule } from 'src/roles/roles.interface';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roleId?: number;
  role?: RoleAttributes;
}

export interface UserHTTPHeader extends UserJwtPayload {
  permitModules?: IPermitModule[];
}

export interface UserJwtPayload {
  sub: number;
  username: string;
  userInfo: UserAttributes;
}

@Table
export class User extends Model<UserAttributes, CreateUserDto> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column
  password: string;

  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}

export class FilterUserDto implements FindOptions<User> {}
