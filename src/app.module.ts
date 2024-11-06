import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';
import { dataSourceOptions } from 'db/data-source';
import { LearnerModule } from './learner/learner.module';
import { SubjectModule } from './subject/subject.module';
import { LearnerSubjectModule } from './learner-subject/learner-subject.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
      TypeOrmModule.forRoot(
        dataSourceOptions
      ),
      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth:{
            user: 'brynechib@gmail.com',
            pass: 'bbrq sfkv jpab mabz'
          }
        }
      })
      ,
    AuthModule, 
    UsersModule, 
    TeacherModule, LearnerModule, SubjectModule, LearnerSubjectModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
