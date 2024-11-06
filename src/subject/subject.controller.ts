import { Controller, Body, Post, Get, Query, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Public } from 'src/decorators/public-route';
import { FindSubjectDto } from './dto/find-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiCreatedResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Subject } from './entities/subject.entity';

@ApiBearerAuth('access-token')
@Controller('subjects')
export class SubjectController {
    constructor (private readonly subjectService: SubjectService){}

    @Post()
    @ApiOperation({ summary: 'Create a new subject' })
    @ApiResponse({ status: 201, description: 'The subject has been successfully created.' })
    @ApiCreatedResponse({
        description: 'Created subject object as response. Try again!',
        type: Subject,
    })
    @ApiBadRequestResponse({description: 'Subject cannot registered'})   
    create(@Body() createSubjectDto: CreateSubjectDto){
        return this.subjectService.create(createSubjectDto);
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all subject' })
    @ApiResponse({ status: 200, description: 'List of all subjects.', type: [CreateSubjectDto] })    
    findAll(@Query() query: FindSubjectDto){
       return this.subjectService.findAll(query); 
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a subject by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Subject found by ID.', type: CreateSubjectDto })
    @ApiResponse({ status: 404, description: 'Subject not found.' })    
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.subjectService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a subject' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'The subject has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Subject not found.' })    
    update(@Param('id', ParseIntPipe) id: number, @Body() updateLearnerDto : UpdateSubjectDto){
        return this.subjectService.update(id, updateLearnerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a subject' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Subject has been deleted.' })
    @ApiResponse({ status: 404, description: 'Subject not found.' })       
    delete(@Param('id', ParseIntPipe) id: number){
        return this.subjectService.delete(id);
    }

}
