import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('enroll')
@UseGuards(JwtAuthGuard)
export class EnrollController {
  constructor(private prisma: PrismaService) {}

  @Post()
async enroll(
  @Req() req,
  @Body() body: { courseId: number },
) {
  const userId = req.user.userId;

  const already = await this.prisma.enrollment.findFirst({
    where: {
      userId,
      courseId: body.courseId,
    },
  });

  if (already) {
    return { message: 'Already enrolled' };
  }

  return this.prisma.enrollment.create({
    data: {
      userId,
      courseId: body.courseId,
    },
  });
}


  // 👉 MY COURSES API
  @Get('my')
  async myCourses(@Req() req) {
    const userId = req.user.userId;

    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
    });
  }
}
