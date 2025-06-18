import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma/prisma.service";

@Injectable()
export class WalletRepository {
  constructor(private prismaService: PrismaService) {}

  async topupWalletBalanceWithTransaction(
    userId: number,
    balance: number,
  ): Promise<boolean> {
    return this.prismaService.$transaction(async (tx) => {
      const [user] = await tx.$queryRawUnsafe<User[]>(
        `SELECT * FROM User WHERE id = ? FOR UPDATE`,
        userId,
      );

      if (!user) {
        throw new Error("User not found");
      }

      await tx.user.update({
        where: { id: userId },
        data: {
          walletBalance: {
            increment: balance,
          },
        },
      });

      return true;
    });
  }
}
