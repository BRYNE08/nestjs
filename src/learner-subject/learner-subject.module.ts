import { Module } from '@nestjs/common';
import { LearnerSubjectController } from './learner-subject.controller';
import { LearnerSubjectService } from './learner-subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner } from 'src/learner/entities/learner.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { LearnerSubject } from './entities/learner-subject.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Learner,Subject,LearnerSubject])],
  controllers: [LearnerSubjectController],
  providers: [LearnerSubjectService]
})
export class LearnerSubjectModule {}
