import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { LearnerSubject } from 'src/learner-subject/entities/learner-subject.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subjectId: number;

  @Column()
  subjectName: string;

  @Column()
  description: string;

  @OneToOne(() => Teacher, (teacher) => teacher.subject, {onDelete:'SET NULL'})
  teacher: Teacher;

  @OneToMany(() => LearnerSubject, (learnerSubject) => learnerSubject.subject, {onDelete:'CASCADE'})
  learnerSubjects: LearnerSubject[];

}