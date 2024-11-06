import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { FindSubjectDto } from './dto/find-subject.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
    constructor (@InjectRepository(Subject) private readonly subjectRepository:Repository<Subject>){}

    async create(createSubjectDto: CreateSubjectDto){
        const newSubject = this.subjectRepository.create(createSubjectDto);
        console.log(createSubjectDto)
        return await this.subjectRepository.save(newSubject);
    }

    async findAll(dto: FindSubjectDto){
        const {subjectName, description } = dto;
        const conditions : FindOptionsWhere<Subject> | FindOptionsWhere<Subject>[] = {
            ...(subjectName? {subjectName} : {}),
            ...(description? {description}: {}),
        };

        return await this.subjectRepository.find(
            {where : conditions}
        );
    }

    async findOne(subjectId: number){
        const subject = await this.subjectRepository.findOneBy({subjectId})

        if (!subject){
            throw new NotFoundException('Subject not found');
        }

        return subject;
    }

    async update(id: number, updateSubjectDto:  UpdateSubjectDto){
        const subject = await this.findOne(id);

        Object.assign(subject, updateSubjectDto);

        return await this.subjectRepository.save(subject);
    }

    async delete(id: number){
        const subject = await this.findOne(id);

        await this.subjectRepository.remove(subject);
    }


}
