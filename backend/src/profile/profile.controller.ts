import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return {
      message: 'Protected profile data',
      user: req.user,
    };
  }
}
