import { Injectable } from "@nestjs/common";
import { LeaderboardRepository } from "../leaderboard-repository/leaderboard-repository";

@Injectable()
export class LeaderboardService {
  constructor(private leaderboardRepository: LeaderboardRepository) {}

  async updateScore(id: number, score: number) {
    const bestScore = await this.leaderboardRepository.getBestScoreById(id);
    if (score <= bestScore) {
      return {
        message: "Score is not higher than the best score.",
      };
    }

    const updatedUser = await this.leaderboardRepository.updateScore(id, score);
    return {
      message: "Score updated successfully.",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        bestScore: updatedUser.bestScore,
      },
    };
  }

  async getLeaderboard(take: number = 10, lastId?: number) {
    const leaderboard = await this.leaderboardRepository.getLeaderboard(
      Math.min(take, 50),
      lastId ? { id: lastId } : undefined,
    );
    return leaderboard.map((user) => ({
      username: user.username,
      bestScore: user.bestScore,
    }));
  }
}
