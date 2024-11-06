import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
   
    @ApiProperty({
        description: 'Teacher first name',
        example: 'Maths'
    })  
    subjectName: string;
  
    @ApiProperty({
        description: 'Subject description',
        example: 'Number'
    })      
    description: string;

}