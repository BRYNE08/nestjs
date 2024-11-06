import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FindTeacherDto } from './dto/find-teacher.dto';
import { Learner } from 'src/learner/entities/learner.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TeacherService {
    constructor (
        @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>,
        @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>,
        private readonly emailService: EmailService
    ){}

    async create(createTeacherDto: CreateTeacherDto){
        const newTeacher = this.teacherRepository.create(createTeacherDto);
        const {email, firstName, lastName} = createTeacherDto;
        await this.emailService.sendMail(email,firstName, lastName);
        return await this.teacherRepository.save(newTeacher);
    }

    async findAll(dto: FindTeacherDto){
        const {firstName, lastName, stream, phoneNumber } = dto;
        const conditions : FindOptionsWhere<Teacher> | FindOptionsWhere<Teacher>[] = {
            ...(firstName? {firstName} : {}),
            ...(lastName? {lastName}: {}),
            ...(stream? {stream}: {}),
            ...(phoneNumber? {phoneNumber}: {}) 
        };

        return await this.teacherRepository.find(
            {where : conditions, relations:{
                learner: true,
                subject: true
            }},
        );
    }

    async findOne(teacherId: number){
        const teacher = await this.teacherRepository.findOneBy({teacherId})

        if (!teacher){
            throw new NotFoundException('Teacher not found');
        }

        return teacher;
    }

    async update(id: number, updateTeacherDto: UpdateTeacherDto){
        const user = await this.findOne(id);

        Object.assign(user, updateTeacherDto);

        return await this.teacherRepository.save(user);
    }

    async delete(id: number){
        const user = await this.findOne(id);

       return await this.teacherRepository.remove(user);
    }

}
