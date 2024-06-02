import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';

@Controller()
export class AuthController {
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return { token: req.user };
  }
}
