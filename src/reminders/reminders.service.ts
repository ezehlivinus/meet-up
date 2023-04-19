import { Injectable } from '@nestjs/common';
import { Reminder } from './reminders.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private remindersRepository: Repository<Reminder>
  ) {}

  async create(createReminderDto: Partial<Reminder>) {
    return await this.remindersRepository.save(createReminderDto);
  }

  async findById(id: number): Promise<Reminder> {
    return await this.remindersRepository.findOneBy({ id });
  }

  async find(filter?: FindManyOptions<Reminder>): Promise<Reminder[]> {
    return await this.remindersRepository.find(filter);
  }
}
