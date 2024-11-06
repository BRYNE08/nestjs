import { ApiProperty } from "@nestjs/swagger";
export class FindTeacherDto {

    @ApiProperty({
        description: 'Teacher first name',
        required:false
    })  
    firstName?: string;

    @ApiProperty({
        description: 'Teacher surname',
        required:false
    })      
    lastName?: string;

    @ApiProperty({
        description: 'Science, Commerce, Humanites',
        required:false
    })  
    stream?: string;

    @ApiProperty({
        description: 'Teacher email address',
        required:false
    })  
    email?: string;

    @ApiProperty({
        description: 'Teacher cellphone number',
        required:false
    })      
    phoneNumber?: string;
}