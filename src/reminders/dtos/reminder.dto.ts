import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
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

export class FindRemindersQueryDto {
  @ApiProperty({
    required: false
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(($this) => Number.parseInt($this.value))
  user?: number;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Transform(($this) => Number.parseInt($this.value))
  after?: number;
}
