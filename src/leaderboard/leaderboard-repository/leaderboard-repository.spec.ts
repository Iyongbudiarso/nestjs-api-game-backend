import { Test, TestingModule } from "@nestjs/testing";
import { LeaderboardRepository } from "./leaderboard-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("LeaderboardRepository", () => {
  let service: LeaderboardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardRepository, PrismaService],
    }).compile();

    service = module.get<LeaderboardRepository>(LeaderboardRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
