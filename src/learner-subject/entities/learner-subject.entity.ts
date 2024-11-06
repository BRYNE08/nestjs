import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Learner } from 'src/learner/entities/learner.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Entity()
export class LearnerSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'learnerId'})
  learnerId: number;

  @Column({name: 'subjectId', nullable: true})
  subjectId: number;

  @ManyToOne(() => Learner, (learner) => learner.learnerSubjects, { eager: true })
  @JoinColumn({ name: 'learnerId' }) 
  learner: Learner;

  @ManyToOne(() => Subject, (subject) => subject.learnerSubjects, { eager: true })
  @JoinColumn({ name: 'subjectId' }) 
  subject: Subject;
}
