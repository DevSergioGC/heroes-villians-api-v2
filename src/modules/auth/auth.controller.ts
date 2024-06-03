import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';
import { SkipGuard } from 'src/decorators/jwt-exceptions.decorator';

@Controller()
export class AuthController {
  @Post('login')
  @SkipGuard()
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return { token: req.user };
  }
}
