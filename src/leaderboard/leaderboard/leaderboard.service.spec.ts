import { Test, TestingModule } from "@nestjs/testing";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardRepository } from "../leaderboard-repository/leaderboard-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("LeaderboardService", () => {
  let service: LeaderboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardService, LeaderboardRepository, PrismaService],
    }).compile();

    service = module.get<LeaderboardService>(LeaderboardService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
