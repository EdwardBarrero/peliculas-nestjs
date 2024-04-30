import { Controller } from '@nestjs/common';
import { PermitModulesService } from './permit-modules.service';

@Controller('permit-modules')
export class PermitModulesController {
  constructor(private readonly permitModulesService: PermitModulesService) {}
}
