import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GeneralResponseDto } from '../base/generalReturn.dto';
import { UserEntity } from './entities/index.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const response: GeneralResponseDto<UserEntity> =
      await this.userService.create(createUserDto);

    if (!response.success) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode,
        error: response.error.message,
      });
    }

    return res.status(response.statusCode).json({
      statusCode: response.statusCode,
      data: {
        idUser: response.data.id,
      },
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users: GeneralResponseDto<UserEntity[]> =
      await this.userService.findAll();

    if (!users.success) {
      return res.status(users.statusCode).json({
        statusCode: users.statusCode,
        error: users.error.message,
      });
    }

    return res.status(users.statusCode).json({
      statusCode: users.statusCode,
      data: users.data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user: GeneralResponseDto<UserEntity> =
      await this.userService.findOne(+id);

    if (!user.success) {
      return res.status(user.statusCode).json({
        statusCode: user.statusCode,
        error: user.error.message,
      });
    }

    return res.status(user.statusCode).json({
      statusCode: user.statusCode,
      data: user.data,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const response: GeneralResponseDto<UserEntity> =
      await this.userService.update(+id, updateUserDto);

    if (!response.success) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode,
        error: response.error.message,
      });
    }

    return res.status(response.statusCode).json({
      statusCode: response.statusCode,
      data: {
        idUser: response.data.id,
        username: response.data.username,
      },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response: GeneralResponseDto<UserEntity> =
      await this.userService.remove(+id);

    if (!response.success) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode,
        error: response.error.message,
      });
    }

    return res.status(response.statusCode).json({
      statusCode: response.statusCode,
      message: 'User deleted successfully',
    });
  }
}
