import { Injectable } from "@nestjs/common";
import { Item, User } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma/prisma.service";

@Injectable()
export class ShopRepository {
  constructor(private prismaService: PrismaService) {}

  async getItems(): Promise<Item[]> {
    const items = await this.prismaService.item.findMany();

    return items;
  }

  async buyItemWithTransaction(
    userId: number,
    itemId: number,
  ): Promise<boolean> {
    return this.prismaService.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        throw new Error("Item not found");
      }

      const [user] = await tx.$queryRawUnsafe<User[]>(
        `SELECT * FROM User WHERE id = ? FOR UPDATE`,
        userId,
      );

      if (!user || user.walletBalance < item.price) {
        throw new Error("Not enough balance");
      }

      const userItem = await tx.userItem.findUnique({
        where: {
          userId_itemId: {
            userId,
            itemId,
          },
        },
      });

      if (userItem) {
        throw new Error("Already have Item");
      }

      await tx.user.update({
        where: { id: userId },
        data: {
          walletBalance: {
            decrement: item.price,
          },
        },
      });

      await tx.userItem.create({
        data: {
          userId,
          itemId,
        },
      });

      return true;
    });
  }
}
