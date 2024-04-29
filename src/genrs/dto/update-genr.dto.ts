import { PartialType } from '@nestjs/mapped-types';
import { CreateGenrDto } from './create-genr.dto';

export class UpdateGenrDto extends PartialType(CreateGenrDto) {}
