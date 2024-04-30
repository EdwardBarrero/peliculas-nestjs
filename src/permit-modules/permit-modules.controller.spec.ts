import { Test, TestingModule } from '@nestjs/testing';
import { PermitModulesController } from './permit-modules.controller';
import { PermitModulesService } from './permit-modules.service';

describe('PermitModulesController', () => {
  let controller: PermitModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermitModulesController],
      providers: [PermitModulesService],
    }).compile();

    controller = module.get<PermitModulesController>(PermitModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
