import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto, User, UserAttributes } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { encryptPassword, comparePassword } from 'src/config/encryptConfig';
import { Role } from 'src/roles/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly usersModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await encryptPassword(createUserDto.password);
    const user = this.usersModel.create(createUserDto);
    return user;
  }

  findAll(filterParams: FilterUserDto) {
    const users = this.usersModel.findAll({ ...filterParams });
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersModel.findByPk(id);
    return user;
  }

  async getAllAuthUserData(
    username: string,
  ): Promise<UserAttributes | undefined> {
    const user = await this.usersModel.findOne({
      where: { username },
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
    });
    const userJson = user?.toJSON();
    return userJson;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.username) return 'username can not be updated';
    const user = await this.findOne(id);
    if (!user) return 'user not found';
    const comparatePassword = await comparePassword(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!comparatePassword) return 'password not match';
    updateUserDto.password = await encryptPassword(updateUserDto.password);
    this.usersModel.update(updateUserDto, { where: { id } });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
