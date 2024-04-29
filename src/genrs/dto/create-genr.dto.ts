import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenrDto {
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Action',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
