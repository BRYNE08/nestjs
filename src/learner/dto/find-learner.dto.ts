import { ApiProperty } from "@nestjs/swagger";

export class FindLearnerDto {

    @ApiProperty({
        description: 'learner first name',
        required:false,
    })      
    firstName?: string;

    @ApiProperty({
        description: 'learner surname',
        required:false,
    })     
    lastName?: string;

    @ApiProperty({
        description: 'learner stream address',
        required:false,
    })             
    stream?: string;

    @ApiProperty({
        description: 'learner email address',
        required:false,
    })             
    email?: string;

    @ApiProperty({
        description: 'learner age',
        required:false,
        example: 16
    })      
    teacherName?: string;

    @ApiProperty({
        description: 'search item',
        required:false,
    })  
    search?: string;

}