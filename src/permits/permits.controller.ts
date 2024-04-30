import { Controller } from '@nestjs/common';
import { PermitsService } from './permits.service';

@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}
}
