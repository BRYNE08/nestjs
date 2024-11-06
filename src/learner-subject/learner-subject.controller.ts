import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LearnerSubjectService } from './learner-subject.service';
import { CreateLearnerSubjectDto } from './dto/learner-subject.dto';
import { ApiBadRequestResponse,ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LearnerSubject } from './entities/learner-subject.entity';

@ApiBearerAuth('access-token')
@Controller('learner-subject')
export class LearnerSubjectController {
    constructor (private readonly learnerSubjectService: LearnerSubjectService){} 

  @Post()
  @ApiOperation({ summary: 'Add a subject to a learner' })
  @ApiResponse({ status: 201, description: 'The learner has been successfully created.' })
  @ApiCreatedResponse({
      description: 'Created user object as response. Try again!',
      type: LearnerSubject,
  })
  @ApiBadRequestResponse({description: 'learner cannot register'})
  async addLearner(@Body() createLearnerSubjectDto: CreateLearnerSubjectDto) {
    return this.learnerSubjectService.createLearnerSubject(createLearnerSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learnes and subjects' })
  @ApiResponse({ status: 200, description: 'List of learner subject.', type: [CreateLearnerSubjectDto] })      
  async getAll(){
    return this.learnerSubjectService.getAll();
  }


  @Get('learner/:id')
  @ApiOperation({ summary: 'Get a learner and subject by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Learner and Subjects found by learner ID.', type: [CreateLearnerSubjectDto] })
  @ApiResponse({ status: 404, description: 'Learner and subject not found.' })      
  async getSubjectsByLearner(@Param('id', ParseIntPipe) id: number){
    return this.learnerSubjectService.findByLearner(id);
  }


  @Get('subject/:id')
  @ApiOperation({ summary: 'Get a learner and subject by subject ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Learner and Subjects found by ID.', type: CreateLearnerSubjectDto })
  @ApiResponse({ status: 404, description: 'Learner and subject not found.' })        
  async getLearnersBySubject(@Param('id', ParseIntPipe) id: number){
    return this.learnerSubjectService.findBySubject(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learner subject' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Learner subject has been deleted.' })
  @ApiResponse({ status: 404, description: 'Learner subject not found.' })      
  async unenrollLearner(@Param('id', ParseIntPipe) id: number){
    return this.learnerSubjectService.remove(id);
  }
}
