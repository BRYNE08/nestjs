import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
