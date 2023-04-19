import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';

const now = new Date();

export class CreateReminderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  user: number;

  @ApiProperty({
    default: new Date(now.getFullYear(), now.getMonth(), 1, 24)
  })
  @IsDateString()
  @IsOptional()
  date?: Date;
}
