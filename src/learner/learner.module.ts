import { Module } from '@nestjs/common';
import { LearnerController } from './learner.controller';
import { LearnerService } from './learner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner } from './entities/learner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Learner])],
  controllers: [LearnerController],
  providers: [LearnerService]
})
export class LearnerModule {}
