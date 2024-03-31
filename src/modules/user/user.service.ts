import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UtilsService } from 'src/modules/utils/utils.service';
import { GeneralResponseDto } from '../base/generalReturn.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly utilsService: UtilsService,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(
    createUserDto: CreateUserDto,
  ): Promise<GeneralResponseDto<UserEntity>> {
    try {
      if (await this.checkUser(createUserDto.username)) {
        return new GeneralResponseDto<UserEntity>(
          false,
          HttpStatus.BAD_REQUEST,
          null,
          {
            message: 'User already exists',
            error: 'User already exists',
          },
        );
      }

      const newUser: CreateUserDto = {
        username: createUserDto.username,
        password: this.utilsService.hashPassword(createUserDto.password),
        idRole: createUserDto.idRole,
      };

      const createdUser: UserEntity = await this.userRepository.save(newUser);

      return new GeneralResponseDto<UserEntity>(
        true,
        HttpStatus.CREATED,
        createdUser,
      );
    } catch (error) {
      this.logger.error(`Error creating new user: ${error.message}`);
      return new GeneralResponseDto<UserEntity>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          message: 'Error creating new user',
          error: error.message,
        },
      );
    }
  }

  async checkUser(
    username: CreateUserDto['username'],
  ): Promise<boolean | GeneralResponseDto<CreateUserDto>> {
    try {
      const user = await this.userRepository.findOneBy({ username });
      return !!user;
    } catch (error) {
      this.logger.error(`Error checking user: ${error.message}`);
      return new GeneralResponseDto<CreateUserDto>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          message: 'Error checking user',
          error: error.message,
        },
      );
    }
  }

  async findAll(): Promise<GeneralResponseDto<UserEntity[]>> {
    try {
      const users: UserEntity[] = await this.userRepository.find({
        select: {
          id: true,
          username: true,
          createdAt: true,
          role: {
            id: true,
            description: true,
          },
        },
        relations: ['role'],
        order: {
          id: 'ASC',
        },
      });
      return new GeneralResponseDto<UserEntity[]>(true, HttpStatus.OK, users);
    } catch (error) {
      this.logger.error(`Error getting all users: ${error.message}`);
      return new GeneralResponseDto<UserEntity[]>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          message: 'Error getting all users',
          error: error.message,
        },
      );
    }
  }

  async findOne(id: number): Promise<GeneralResponseDto<UserEntity>> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        select: {
          id: true,
          username: true,
          createdAt: true,
          role: {
            id: true,
            description: true,
          },
        },
        relations: ['role'],
        order: {
          id: 'ASC',
        },
        where: { id },
      });

      if (!user) {
        return new GeneralResponseDto<UserEntity>(
          false,
          HttpStatus.NOT_FOUND,
          null,
          {
            message: 'User not found',
            error: 'User not found',
          },
        );
      }

      return new GeneralResponseDto<UserEntity>(true, HttpStatus.OK, user);
    } catch (error) {
      this.logger.error(`Error getting user: ${error.message}`);
      return new GeneralResponseDto<UserEntity>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          message: 'Error getting user',
          error: error.message,
        },
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<GeneralResponseDto<UserEntity>> {
    try {
      //! TODO: Only admins can update passwords and roles
      const oldUser: UserEntity = await this.userRepository.findOneBy({ id });
      const newUser: UserEntity = await this.userRepository.save({
        ...oldUser,
        ...updateUserDto,
        when: (id = id),
      });

      return new GeneralResponseDto<UserEntity>(true, HttpStatus.OK, newUser);
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      return new GeneralResponseDto<UserEntity>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          message: 'Error updating user',
          error: error.message,
        },
      );
    }
  }

  async remove(id: number): Promise<GeneralResponseDto<UserEntity>> {
    try {
      const user: UserEntity = await this.userRepository.findOneBy({ id });

      if (!user) {
        return new GeneralResponseDto<UserEntity>(
          false,
          HttpStatus.NOT_FOUND,
          null,
          {
            message: 'User not found',
            error: 'User not found',
          },
        );
      }

      await this.userRepository.delete({ id });

      return new GeneralResponseDto<UserEntity>(
        true,
        HttpStatus.NO_CONTENT,
        null,
      );
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      return new GeneralResponseDto<UserEntity>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          message: 'Error deleting user',
          error: error.message,
        },
      );
    }
  }
}
