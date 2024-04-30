import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Permit, PermitAttributes } from 'src/permits/entities/permits.entity';
import {
  Role,
  RolesPermitModules,
  RoleAttributes,
} from 'src/roles/entities/roles.entity';
import { PermitModulesEnum } from 'src/roles/roles.interface';

export interface PermitModuleAttributes {
  id: number;
  name: PermitModulesEnum;
  permits?: PermitAttributes[];
  roles?: RoleAttributes[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table
export class PermitModule extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @HasMany(() => Permit)
  permits: Permit[];

  @BelongsToMany(() => Role, () => RolesPermitModules)
  roles: Role[];
}
