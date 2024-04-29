import { Test, TestingModule } from '@nestjs/testing';
import { GenrsController } from './genrs.controller';
import { GenrsService } from './genrs.service';

describe('GenrsController', () => {
  let controller: GenrsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenrsController],
      providers: [GenrsService],
    }).compile();

    controller = module.get<GenrsController>(GenrsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
