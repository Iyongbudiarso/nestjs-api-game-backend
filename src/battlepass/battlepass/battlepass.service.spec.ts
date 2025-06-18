import { Test, TestingModule } from "@nestjs/testing";
import { BattlepassService } from "./battlepass.service";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { BattlepassRepository } from "../battlepass-repository/battlepass-repository";

describe("BattlepassService", () => {
  let service: BattlepassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlepassService, BattlepassRepository, PrismaService],
    }).compile();

    service = module.get<BattlepassService>(BattlepassService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
