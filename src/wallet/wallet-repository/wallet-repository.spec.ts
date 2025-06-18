import { Test, TestingModule } from "@nestjs/testing";
import { WalletRepository } from "./wallet-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("WalletRepository", () => {
  let service: WalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletRepository, PrismaService],
    }).compile();

    service = module.get<WalletRepository>(WalletRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
