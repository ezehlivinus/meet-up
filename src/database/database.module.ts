import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          type: config.get<string>('database.type'),
          url: config.get<string>('database.url'),

          // host: config.get<string>('database.host'),
          // port: config.get<number>('database.port'),
          // username: config.get<string>('database.username'),
          // password: config.get<string>('database.password'),
          // database: config.get<string>('database.database'),

          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: config.get('app.env') === 'development' ? true : false
        } as TypeOrmModuleOptions)
    })
  ]
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
