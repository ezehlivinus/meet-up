import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
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

  async find(filter?: FindManyOptions<User>): Promise<User[]> {
    const options: FindManyOptions<User> = filter as FindManyOptions<User>;
    return await this.usersRepository.find(options);
  }

  async findWithFilter(filter: FindManyOptions<User>): Promise<User[]> {
    return await this.usersRepository.find(filter);
  }

  async findOne(filter: FindOptionsWhere<User>): Promise<User> {
    return await this.usersRepository.findOneBy(filter);
  }

  async findOneOrFail(filter: FindOptionsWhere<User>) {
    const user = await this.findOne(filter);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return user;
  }

  async create(createUserDto: Partial<User>) {
    await this.findOneOrFail({ email: createUserDto.email });
    return await this.usersRepository.save(createUserDto);
  }

  async update(id: Partial<User>['id'], update: Partial<User>) {
    return await this.usersRepository.update(id, update);
  }
}
