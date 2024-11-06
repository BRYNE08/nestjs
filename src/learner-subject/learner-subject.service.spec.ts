import { Test, TestingModule } from '@nestjs/testing';
import { LearnerSubjectService } from './learner-subject.service';

describe('LearnerSubjectService', () => {
  let service: LearnerSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnerSubjectService],
    }).compile();

    service = module.get<LearnerSubjectService>(LearnerSubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
