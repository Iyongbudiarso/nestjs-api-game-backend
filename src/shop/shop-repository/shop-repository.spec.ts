import { Test, TestingModule } from "@nestjs/testing";
import { ShopRepository } from "./shop-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("ShopRepository", () => {
  let service: ShopRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopRepository, PrismaService],
    }).compile();

    service = module.get<ShopRepository>(ShopRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
