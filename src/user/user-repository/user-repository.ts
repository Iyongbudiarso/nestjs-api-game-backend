import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async save(username: string, password: string) {
    const user = await this.prismaService.user.create({
      data: {
        username,
        password,
      },
    });

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    return user;
  }

  async findById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return user;
  }
}
