import { Injectable } from "@nestjs/common";
import { User, UserQuest } from "../../../generated/prisma";
import { PrismaService } from "../../prisma/prisma/prisma.service";
import Quests from "../quests";

function getRandomQuests() {
  const quests = new Set();
  while (quests.size < 3) {
    const randomIndex = Math.floor(Math.random() * Quests.length);
    quests.add(Quests[randomIndex]);
  }
  return Array.from(quests);
}

@Injectable()
export class BattlepassRepository {
  constructor(private prismaService: PrismaService) {}

  async active(userId: number): Promise<boolean> {
    return this.prismaService.$transaction(async (tx) => {
      const [user] = await tx.$queryRawUnsafe<User[]>(
        `SELECT * FROM User WHERE id = ? FOR UPDATE`,
        userId,
      );

      if (!user) {
        throw new Error("User not found");
      }

      if (user.battlepassStatus === 1) {
        throw new Error("Already activated");
      }

      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 30);

      const randomQuests = getRandomQuests();

      await tx.userQuest.createMany({
        data: randomQuests.map((questName) => ({
          userId,
          questName,
        })) as UserQuest[],
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          battlepassStatus: 1,
          battlepassExpiredDate: expiredDate,
        },
      });

      return true;
    });
  }

  async getQuests(userId: number) {
    return await this.prismaService.userQuest.findMany({
      where: {
        userId,
      },
    });
  }

  async getBattlepassStatus(userId: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user?.battlepassStatus === 1;
  }

  async deactive(userId: number): Promise<boolean> {
    return this.prismaService.$transaction(async (tx) => {
      const [user] = await tx.$queryRawUnsafe<User[]>(
        `SELECT * FROM User WHERE id = ? FOR UPDATE`,
        userId,
      );

      if (!user) {
        throw new Error("User not found");
      }

      if (user.battlepassStatus === 0) {
        throw new Error("Already deactivated");
      }

      await tx.userQuest.updateMany({
        where: {
          userId,
          status: "in_progress",
        },
        data: {
          status: "failed",
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          battlepassStatus: 0,
          battlepassExpiredDate: null,
        },
      });

      return true;
    });
  }

  async deactiveUserExpire() {
    const users = await this.prismaService.user.findMany({
      where: {
        battlepassStatus: 1,
        battlepassExpiredDate: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
      },
    });

    users.forEach(({ id }) => {
      void this.deactive(id);
    });
  }
}
