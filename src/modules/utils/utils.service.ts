import { HttpStatus, Injectable } from '@nestjs/common';
import { CryptoConfigService } from 'src/config/crypto-config.service';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { GeneralResponseDto } from '../base/generalReturn.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UtilsService {
  constructor(private readonly cryptoConfigService: CryptoConfigService) {}

  private readonly saltRounds = genSaltSync(
    this.cryptoConfigService.saltRounds,
  );

  hashPassword(password: string): string {
    return hashSync(password, this.saltRounds);
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  async validateData<dataType extends object>(
    data: dataType,
    dtoClass: any,
  ): Promise<GeneralResponseDto<dataType>> {
    const newDto: dataType = plainToClass(dtoClass, data);
    const validationErrors = await validate(newDto);

    if (validationErrors.length > 0) {
      return new GeneralResponseDto<dataType>(
        false,
        HttpStatus.BAD_REQUEST,
        null,
        {
          message: 'Invalid credentials',
          error: validationErrors,
        },
      );
    }

    return new GeneralResponseDto<dataType>(true, HttpStatus.OK, newDto);
  }
}
