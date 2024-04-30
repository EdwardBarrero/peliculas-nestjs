import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import {
  PermitModule,
  PermitModuleAttributes,
} from 'src/permit-modules/entities/permit-modules.entity';
import { PermitActionsEnum } from 'src/roles/roles.interface';

export interface PermitAttributes {
  id: number;
  name: PermitActionsEnum;
  permitModuleId: number;
  permitModule?: PermitModuleAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table
export class Permit extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => PermitModule)
  permitModuleId: number;

  @BelongsTo(() => PermitModule)
  permitModule: PermitModule;
}
