import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Learner } from './entities/learner.entity';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { Repository, FindOptionsWhere, Brackets } from 'typeorm';
import { FindLearnerDto } from './dto/find-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';


@Injectable()
export class LearnerService {
    constructor (@InjectRepository(Learner) private readonly learnerRepository:Repository<Learner>){}

    async create(createLearnerDto: CreateLearnerDto){
        const newLearner = this.learnerRepository.create(createLearnerDto);
        return await this.learnerRepository.save(newLearner);
    }

    async findAll(dto: FindLearnerDto){
        const {firstName, lastName, stream, email, teacherName, search } = dto;

        const queryBuilder = this.learnerRepository.createQueryBuilder('learner');
        firstName && queryBuilder.andWhere('learner.name = :firstName', {firstName});
        lastName && queryBuilder.andWhere('learner.surname = :lastName', {lastName});  
        stream && queryBuilder.andWhere('learner.stream = :stream', {stream});      

        if (teacherName){
            queryBuilder.andWhere('teacher.firstName = :teacherName', {teacherName})
        }

        if (search){
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where('LOWER(learner.name) LIKE LOWER(:search)', {search: `%${search}%`})
                .orWhere('LOWER(learner.surname) LIKE LOWER(:search)', {search: `%${search}%`})
                .orWhere('LOWER(learner.stream) LIKE LOWER(:search)', {search: `%${search}%`})
                .orWhere('LOWER(teacher.firstName) LIKE LOWER(:search)', {search: `%${search}%`})
            }))
        }

        return queryBuilder
        .leftJoin('learner.teacher', 'teacher')
        .select(['learner', 'teacher.firstName'])
        .getMany();
    }

    async findOne(learnerId: number){
        const learner = await this.learnerRepository.findOneBy({learnerId})

        if (!learner){
            throw new NotFoundException('Learner not found');
        }

        return learner;
    }

    async update(id: number, updateLearnerDto:  UpdateLearnerDto){
        const learner = await this.findOne(id);

        Object.assign(learner, updateLearnerDto);

        return await this.learnerRepository.save(learner);
    }

    async delete(id: number){
        const learner = await this.findOne(id);

        await this.learnerRepository.remove(learner);
    }

}

