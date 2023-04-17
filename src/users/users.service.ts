import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findWithFilter(filter: Partial<User>): Promise<User[]> {
    return this.usersRepository.find({ where: filter });
  }

  async findOne(filter: Partial<User>): Promise<User> {
    return await this.usersRepository.findOneBy({ ...filter });
  }

  async findOneOrFail(filter: Partial<User>) {
    const user = await this.findOne(filter);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return user;
  }

  async create(createUserDto: Partial<User>) {
    await this.findOneOrFail({ email: createUserDto.email });
    return await this.usersRepository.create(createUserDto);
  }

  async update(id: Partial<User>['id'], update: Partial<User>) {
    return await this.usersRepository.update(id, update);
  }
}
