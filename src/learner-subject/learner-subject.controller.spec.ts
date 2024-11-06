import { Test, TestingModule } from '@nestjs/testing';
import { LearnerSubjectController } from './learner-subject.controller';

describe('LearnerSubjectController', () => {
  let controller: LearnerSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnerSubjectController],
    }).compile();

    controller = module.get<LearnerSubjectController>(LearnerSubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
