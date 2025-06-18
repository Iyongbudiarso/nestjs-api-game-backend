import { Test, TestingModule } from "@nestjs/testing";
import { BattlepassController } from "./battlepass.controller";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { BattlepassRepository } from "../battlepass-repository/battlepass-repository";
import { JwtModule } from "@nestjs/jwt";
import { BattlepassService } from "./battlepass.service";

describe("BattlepassController", () => {
  let controller: BattlepassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattlepassController],
      providers: [BattlepassRepository, BattlepassService, PrismaService],
      imports: [JwtModule.register({})],
    }).compile();

    controller = module.get<BattlepassController>(BattlepassController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
