import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { UserJWT } from "src/user/user/user.service";
import { LeaderboardService } from "./leaderboard.service";
import { UserGuard } from "../../user/user.guard";
import { Cache, CACHE_MANAGER, CacheKey } from "@nestjs/cache-manager";

@Controller()
export class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post("score")
  @UseGuards(UserGuard)
  updateScore(
    @Request() req: ExpressRequest & { user: UserJWT },
    @Body("score") score: number,
  ) {
    const userId = req.user.id;
    return this.leaderboardService.updateScore(userId, score);
  }

  @Get("leaderboard")
  @CacheKey("leaderboard")
  async getLeaderboard(
    @Query("limit") limit: string = "10",
    @Query("last_id") lastId?: string,
  ) {
    const keyCache = `limit_${limit}_last_id_${lastId}`;
    const leaderboardCache = await this.cacheManager.get(keyCache);
    if (leaderboardCache) {
      // TODO: implement set cache before expire
      return leaderboardCache;
    }

    const getLeaderboard = await this.leaderboardService.getLeaderboard(
      Number(limit),
      Number(lastId),
    );
    void this.cacheManager.set(keyCache, getLeaderboard);
    return getLeaderboard;
  }
}
