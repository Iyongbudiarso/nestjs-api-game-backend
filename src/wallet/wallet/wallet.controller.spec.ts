import { Test, TestingModule } from "@nestjs/testing";
import { WalletController } from "./wallet.controller";
import { JwtModule } from "@nestjs/jwt";
import { WalletService } from "./wallet.service";
import { WalletRepository } from "../wallet-repository/wallet-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("WalletController", () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService, WalletRepository, PrismaService],
      imports: [JwtModule.register({})],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
