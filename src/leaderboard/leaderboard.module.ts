import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard/leaderboard.controller";
import { LeaderboardService } from "./leaderboard/leaderboard.service";
import { LeaderboardRepository } from "./leaderboard-repository/leaderboard-repository";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, LeaderboardRepository],
})
export class LeaderboardModule {}
