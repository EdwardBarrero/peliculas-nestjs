import { Injectable } from '@nestjs/common';
import { Role, RoleAttributes } from './entities/roles.entity';
import { InjectModel } from '@nestjs/sequelize';
import { PermitModule } from 'src/permit-modules/entities/permit-modules.entity';
import { Permit } from 'src/permits/entities/permits.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly rolesModel: typeof Role) {}

  async findOne(id: number): Promise<RoleAttributes | null> {
    const role = await this.rolesModel.findOne({
      where: { id },
      include: [
        {
          model: PermitModule,
          attributes: ['id', 'name'],
          include: [
            {
              model: Permit,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return role?.toJSON() ?? null;
  }
}
