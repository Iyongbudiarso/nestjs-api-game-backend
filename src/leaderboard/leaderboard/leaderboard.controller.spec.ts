import { Test, TestingModule } from "@nestjs/testing";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardRepository } from "../leaderboard-repository/leaderboard-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";

describe("LeaderboardController", () => {
  let controller: LeaderboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderboardController],
      providers: [
        LeaderboardService,
        LeaderboardRepository,
        PrismaService,
        JwtService,
      ],
      imports: [CacheModule.register()],
    }).compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
