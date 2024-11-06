import { Body, Controller, Get, Post, ParseIntPipe, Param, Patch, Delete, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { query } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';
import { FindTeacherDto } from './dto/find-teacher.dto';

@ApiBearerAuth('access-token')
@Controller('teachers')
export class TeacherController {

    constructor (private readonly teacherService: TeacherService){}

    @Post()
    @ApiOperation({ summary: 'Create a new teacher' })
    @ApiResponse({ status: 201, description: 'The teacher has been successfully created.' })
    @ApiCreatedResponse({
        description: 'Created user object as response. Try again!',
        type: Teacher,
    })
    @ApiBadRequestResponse({description: 'teacher cannot register'})
    create(@Body() createTeacherDto: CreateTeacherDto){
        return this.teacherService.create(createTeacherDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all teachers' })
    @ApiResponse({ status: 200, description: 'List of all teachers.', type: [CreateTeacherDto] })
    findAll(@Query() query: FindTeacherDto){
       return this.teacherService.findAll(query); 
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a teacher by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Teacher found by ID.', type: CreateTeacherDto })
    @ApiResponse({ status: 404, description: 'Teacher not found.' })
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.teacherService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a teacher' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'The teacher has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Teacher not found.' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTeacherDto : UpdateTeacherDto){
        return this.teacherService.update(id, updateTeacherDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a teacher' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Teacher has been deleted.' })
    @ApiResponse({ status: 404, description: 'Teacher not found.' })    
    delete(@Param('id', ParseIntPipe) id: number){
        return this.teacherService.delete(id);
    }


}
