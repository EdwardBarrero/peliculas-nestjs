import { Body, Param } from '@nestjs/common';
import { GenrsService } from './genrs.service';
import { CreateGenrDto } from './dto/create-genr.dto';
import { UpdateGenrDto } from './dto/update-genr.dto';
import { PermitModulesEnum } from 'src/roles/roles.interface';
import {
  GetProtectedList,
  GetProtectedRetrieve,
  PostProtected,
  PutProtected,
  DeleteProtected,
  ControllerProtected,
} from 'src/global/decorators/endpoint.decorator';

@ControllerProtected(PermitModulesEnum.Genrs, 'genrs')
export class GenrsController {
  constructor(private readonly genrsService: GenrsService) {}

  @PostProtected(CreateGenrDto)
  create(@Body() createGenrDto: CreateGenrDto) {
    return this.genrsService.create(createGenrDto);
  }

  @GetProtectedList(CreateGenrDto)
  findAll() {
    return this.genrsService.findAll();
  }

  @GetProtectedRetrieve(':id', CreateGenrDto)
  findOne(@Param('id') id: string) {
    return this.genrsService.findOne(+id);
  }

  @PutProtected(':id', CreateGenrDto)
  update(@Param('id') id: string, @Body() updateGenrDto: UpdateGenrDto) {
    return this.genrsService.update(+id, updateGenrDto);
  }

  @DeleteProtected(':id')
  remove(@Param('id') id: string) {
    return this.genrsService.remove(+id);
  }
}
