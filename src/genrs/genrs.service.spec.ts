import { Test, TestingModule } from '@nestjs/testing';
import { GenrsService } from './genrs.service';

describe('GenrsService', () => {
  let service: GenrsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenrsService],
    }).compile();

    service = module.get<GenrsService>(GenrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
