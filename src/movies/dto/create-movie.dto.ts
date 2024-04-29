import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Matrix',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The rating of the movie',
    example: 8.7,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    description: 'The genres of the movie',
    example: [1, 2, 3],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  genrs?: number[];
}
