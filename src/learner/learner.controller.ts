import { Controller, Body, Query, Param,Delete,Patch, ParseIntPipe, Post, Get } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { FindLearnerDto } from './dto/find-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from 'src/decorators/public-route';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Learner } from './entities/learner.entity';


@ApiBearerAuth('access-token')
@Controller('learners')
export class LearnerController {
    constructor (private readonly learnerService: LearnerService){}

    @Post()
    @ApiOperation({ summary: 'Create a new learner' })
    @ApiResponse({ status: 201, description: 'The learner has been successfully created.' })
    @ApiCreatedResponse({
        description: 'Created user object as response. Try again!',
        type: Learner,
    })
    @ApiBadRequestResponse({description: 'learner cannot register'})
    create(@Body() createLearnerDto: CreateLearnerDto){
        return this.learnerService.create(createLearnerDto);
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all learners' })
    @ApiResponse({ status: 200, description: 'List of all learner.', type: [CreateLearnerDto] })    
    findAll(@Query() query: FindLearnerDto){
       return this.learnerService.findAll(query); 
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a learner by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Learner found by ID.', type: CreateLearnerDto })
    @ApiResponse({ status: 404, description: 'Learner not found.' })    
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.learnerService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a learner' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'The learner has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Learner not found.' })    
    update(@Param('id', ParseIntPipe) id: number, @Body() updateLearnerDto : UpdateLearnerDto){
        return this.learnerService.update(id, updateLearnerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a learner' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Learner has been deleted.' })
    @ApiResponse({ status: 404, description: 'Learner not found.' })    
    delete(@Param('id', ParseIntPipe) id: number){
        return this.learnerService.delete(id);
    }

}
