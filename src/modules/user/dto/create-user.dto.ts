import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5, { message: 'Username must be at least 5 characters' })
  @IsNotEmpty()
  username: string;
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsNotEmpty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=(.*[0-9]){2,})(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\d\s])(?=(.*[^0-9a-zA-Z\-\s\.\#\/\,]){1,}).{8,}/gm,
    {
      message:
        'Password must have: 1 Uppercase, 2 Number & 1 Special Characters',
    },
  )
  password: string;
  @IsNumber()
  @Min(1)
  idRole: number;
}
