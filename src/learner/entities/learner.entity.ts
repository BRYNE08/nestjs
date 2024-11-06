import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { LearnerSubject } from 'src/learner-subject/entities/learner-subject.entity';

@Entity()
export class Learner {
  @PrimaryGeneratedColumn()
  learnerId: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  stream: string;

  @Column()
  age: number;

  @Column({name: 'teacherId'})
  teacherId: number;


  @OneToMany(() => LearnerSubject, (learnerSubject) => learnerSubject.learner)
  learnerSubjects: LearnerSubject[];

  @ManyToOne(() => Teacher, (teacher) => teacher.learner)
  @JoinColumn({name: 'teacherId'})
  teacher: Teacher
}