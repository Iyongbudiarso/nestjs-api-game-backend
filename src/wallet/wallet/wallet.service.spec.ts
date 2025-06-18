import { Test, TestingModule } from "@nestjs/testing";
import { WalletService } from "./wallet.service";
import { WalletRepository } from "../wallet-repository/wallet-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("WalletService", () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService, WalletRepository, PrismaService],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
