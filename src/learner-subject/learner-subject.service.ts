import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LearnerSubject } from './entities/learner-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLearnerSubjectDto } from './dto/learner-subject.dto';

@Injectable()
export class LearnerSubjectService {
    constructor(
    @InjectRepository(LearnerSubject)
    private readonly learnerSubjectRepository: Repository<LearnerSubject>,
    ){}


  async createLearnerSubject(createLearnerSubjectDto: CreateLearnerSubjectDto): Promise<LearnerSubject> {
    const learnerSubject = this.learnerSubjectRepository.create(createLearnerSubjectDto);
    return this.learnerSubjectRepository.save(learnerSubject);
  }

  async getAll(){
    return await this.learnerSubjectRepository.find();
  }

  async findByLearner(learnerId: number): Promise<LearnerSubject[]> {
    return this.learnerSubjectRepository.find({ where: { learnerId } });
  }

  async findBySubject(subjectId: number): Promise<LearnerSubject[]> {
    return this.learnerSubjectRepository.find({ where: { subjectId } });
  }

  async remove(id: number): Promise<void> {
    await this.learnerSubjectRepository.delete(id);
  }
  
}