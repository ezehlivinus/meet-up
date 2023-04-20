import {
  All,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { CreateUserDto } from '@/users/dtos/user.dto';
import { CreateReminderDto, FindRemindersQueryDto } from './dtos/reminder.dto';
import { User } from '@/users/user.entity';
import { Equal, FindManyOptions, MoreThanOrEqual } from 'typeorm';
import { Reminder } from './reminders.entity';
import { ErrorResponseDTO } from '@/common/dtos/response.dto';

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

    return newReminder;
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint for listing all reminders'
  })
  async find(@Query() query: FindRemindersQueryDto) {
    const filter: FindManyOptions<Reminder> = {};

    if (query?.after) {
      filter.where = {
        date: MoreThanOrEqual(new Date(query.after))
      };
    }

    if (query?.user) {
      filter.where = {
        user: Equal(query.user)
      };
    }

    const reminders = await this.remindersService.find(filter);

    return reminders;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint for getting a reminder'
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDTO
  })
  async findById(@Param('id') id: number) {
    const user = await this.remindersService.findById(id);

    if (!user) {
      throw new NotFoundException('ID not found');
    }

    return user;
  }

  @All('*')
  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  async all(@Param('id') id: number) {
    return { statusCode: 405 };
  }
}
