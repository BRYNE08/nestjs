import { ApiProperty } from "@nestjs/swagger";

export class FindSubjectDto {

    @ApiProperty({
        description: 'Teacher first name',
        example: 'Maths'
    })    
    subjectName?: string;

    @ApiProperty({
        description: 'Subject description',
        example: 'Numbers, Patterns'
    })  
    description?: string;
}