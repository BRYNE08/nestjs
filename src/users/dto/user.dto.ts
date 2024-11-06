import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({
        description: 'User username',
        example: 'bryne08'
    })  
    username: string;

    @ApiProperty({
        description: 'User password',
        example: 'bryne123'
    })  
    password: string;
}