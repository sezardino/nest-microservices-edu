import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/auth';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUserInput) {
    const { email, password: rawPassword } = input;

    const password = await bcrypt.hash(rawPassword, 10);

    return this.prismaService.user.create({
      data: { email, password },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(dto: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where: dto });
  }
}
