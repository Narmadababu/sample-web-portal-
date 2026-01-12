import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private prisma: PrismaService) {}

  // anyone logged in can view courses
  @Get()
  getCourses() {
    return this.prisma.course.findMany();
  }

  // ONLY ADMIN can add course
  @Post()
  async addCourse(
    @Req() req,
    @Body() body: { title: string; description: string },
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new Error('Only admin can add courses');
    }

    return this.prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
  }
}
