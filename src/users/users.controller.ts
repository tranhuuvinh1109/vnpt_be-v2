import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    description: 'Create a new user',
    schema: {
      example: {
        email: 'example@gmail.com',
        password: 'strongPassword123',
        phone_number: '0123456789',
        date_of_birth: '1995-08-19',
        role: 1,
        user_address: '123 Street, Da Nang, Viet Nam',
        station: 'station_id_001',
        user_type_id: 'type_id_123',
        access_token: 'access_token_example',
        refresh_token: 'refresh_token_example',
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getUserProfile(@Req() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.usersService.getUserProfile(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
