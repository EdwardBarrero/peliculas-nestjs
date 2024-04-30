import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { User, UserAttributes } from 'src/users/entities/user.entity';
import {
  PermitModule,
  PermitModuleAttributes,
} from 'src/permit-modules/entities/permit-modules.entity';

export interface RoleAttributes {
  id: number;
  name: string;
  permitModules?: PermitModuleAttributes[];
  users?: UserAttributes[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table
export class Role extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @HasMany(() => User)
  users: User[];

  @BelongsToMany(() => PermitModule, () => RolesPermitModules)
  permitModules: PermitModule[];
}

@Table
export class RolesPermitModules extends Model {
  @ForeignKey(() => Role)
  roleId: number;

  @ForeignKey(() => PermitModule)
  permitModuleId: number;
}
