import { Test, TestingModule } from '@nestjs/testing';
import { PermitModulesService } from './permit-modules.service';

describe('PermitModulesService', () => {
  let service: PermitModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermitModulesService],
    }).compile();

    service = module.get<PermitModulesService>(PermitModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
