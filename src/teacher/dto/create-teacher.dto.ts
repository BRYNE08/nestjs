import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {

    @ApiProperty({
        description: 'Teacher first name',
        example: 'Jabulani'
    })  
    firstName: string;

    @ApiProperty({
        description: 'Teacher surname',
        example: 'Khumalo'
    })  
    lastName: string;

    @ApiProperty({
        description: 'Science, Commerce, Humanites',
        example: 'Science'
    })  
    stream: string;

    @ApiProperty({
        description: 'Teacher email address',
        example: 'vuyo@gmail.com'
    })  
    email: string;

    @ApiProperty({
        description: 'Teacher cellphone number',
        example: '0785039402'
    })  
    phoneNumber: string;

    @ApiProperty({
        description: 'teacher foreign key',
        example: 1
    })  
    subjectId: number;
}