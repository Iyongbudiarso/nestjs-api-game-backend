import { Test, TestingModule } from "@nestjs/testing";
import { BattlepassRepository } from "./battlepass-repository";
import { PrismaModule } from "src/prisma/prisma.module";

describe("BattlepassRepository", () => {
  let service: BattlepassRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [BattlepassRepository],
    }).compile();

    service = module.get<BattlepassRepository>(BattlepassRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
