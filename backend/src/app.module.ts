import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollModule } from './enroll/enroll.module';

@Module({
 imports: [AuthModule, ProfileModule, PrismaModule,  UsersModule, CoursesModule, EnrollModule,], // 👈 THIS LINE IS CRITICAL
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
