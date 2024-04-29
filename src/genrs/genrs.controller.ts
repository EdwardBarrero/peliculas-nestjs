import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenrsService } from './genrs.service';
import { CreateGenrDto } from './dto/create-genr.dto';
import { UpdateGenrDto } from './dto/update-genr.dto';
import {
  ApiTags,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('genrs')
@Controller('genrs')
export class GenrsController {
  constructor(private readonly genrsService: GenrsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateGenrDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createGenrDto: CreateGenrDto) {
    return this.genrsService.create(createGenrDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: CreateGenrDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findAll() {
    return this.genrsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: CreateGenrDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.genrsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: CreateGenrDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  update(@Param('id') id: string, @Body() updateGenrDto: UpdateGenrDto) {
    return this.genrsService.update(+id, updateGenrDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  remove(@Param('id') id: string) {
    return this.genrsService.remove(+id);
  }
}
