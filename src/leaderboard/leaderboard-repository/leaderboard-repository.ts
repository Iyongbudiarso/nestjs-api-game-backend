import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma/prisma.service";

@Injectable()
export class LeaderboardRepository {
  constructor(private prismaService: PrismaService) {}

  async updateScore(id: number, bestScore: number) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { bestScore },
    });

    return user;
  }

  async getBestScoreById(userId: number): Promise<number> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return user?.bestScore || 0;
  }

  // Fetch users and order them by bestScore in descending order
  // limit the results to the top 10 users
  // add cursor pagination
  async getLeaderboard(
    take: number = 10,
    cursor?: { id: number },
  ): Promise<{ username: string; bestScore: number }[]> {
    const users = await this.prismaService.user.findMany({
      orderBy: { bestScore: "desc" },
      take,
      cursor,
      select: {
        username: true,
        bestScore: true,
      },
    });

    return users;
  }
}
