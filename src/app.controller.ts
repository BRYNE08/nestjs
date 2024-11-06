import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Public } from './decorators/public-route';
import { UserDto } from './users/dto/user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBadRequestResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from './users/entities/user.entity';

class LoginDto {
  @ApiProperty({ 
    description: 'The username of the user', 
    example: 'bryne08',
    required: true })
   username: string;

  @ApiProperty({ description: 'The password of the user',
  example: 'bryne123',  
  required: true })
  password: string;
}

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
 
  @Public()
  @Post('auth/login') 
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Aithenticate user' })
  @ApiBody({
    description: 'Login credentials',
    type: LoginDto
  })  
  @ApiCreatedResponse({
    description: 'Returns user object and authentication token upon successful login.',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials provided' })  
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  
  @Public()
  @Post('auth/signup')
  @ApiOperation({ summary: 'Create account for new user' })
  @ApiCreatedResponse({
    description: 'Created user object as response. Try again!',
    type: User,
})
 @ApiBadRequestResponse({description: 'User cannot register'}) 
  async signup(@Body() userDto: UserDto){
    return this.authService.signup(userDto);
  } 



}
