import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


export class CreateLearnerDto {

    @ApiProperty({
        description: 'learner first name',
        example: 'Abongile'
    })      
    name: string;

    @ApiProperty({
        description: 'learner surname',
        example: 'Nyathi'
    })     
    surname: string;

    @ApiProperty({
        description: 'learner email address',
        example: 'vuyo@gmail.com'
    })      
    email: string;

    @ApiProperty({
        description: 'learner stream address',
        example: 'science'
    })      
    stream: string;

    @ApiProperty({
        description: 'learner age',
        example: 16
    })  
    age: number

    @ApiProperty({
        description: 'teacher id',
        example: 1
    })  
    teacherId: number
}