import {
  All,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/users/dtos/user.dto';
import { CreateReminderDto } from './dtos/reminder.dto';
import { User } from '@/users/user.entity';

@Controller('reminders')
@ApiTags('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Endpoint for creating a reminders'
  })
  async create(@Body() createReminderDto: CreateReminderDto) {
    const newReminder = await this.remindersService.create(
      createReminderDto as Partial<User>
    );

    return {
      data: newReminder
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Endpoint for listing all reminders'
  })
  async find() {
    const reminders = await this.remindersService.find();

    return {
      data: reminders
    };
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    const user = await this.remindersService.findById(id);

    return { data: user };
  }

  @All('*')
  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  async all(@Param('id') id: number) {
    return { statusCode: 405 };
  }
}
