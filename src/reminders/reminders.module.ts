import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './reminders.entity';
import { RemindersController } from './reminders.controller';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Reminder])],
  providers: [RemindersService],
  exports: [RemindersService],
  controllers: [RemindersController]
})
export class RemindersModule {}
