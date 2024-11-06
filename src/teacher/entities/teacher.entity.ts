import {Subject} from 'src/subject/entities/subject.entity';
import { Learner } from 'src/learner/entities/learner.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  teacherId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  stream: string;

  @Column()
  phoneNumber: string;

  @Column({name: 'subjectId', nullable: true})
  subjectId: number;
  
  @OneToOne(() => Subject, (subject) => subject.teacher, {onDelete:'SET NULL'})
  @JoinColumn({name: 'subjectId'})
  subject: Subject;

  @OneToMany(() => Learner, (learner) => learner.teacher, {onDelete: 'SET NULL'})
  @JoinColumn({name: 'learnerId'})
  learner: Learner
}