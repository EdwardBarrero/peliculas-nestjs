import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<DataDto> {
  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  results: DataDto[];
}
