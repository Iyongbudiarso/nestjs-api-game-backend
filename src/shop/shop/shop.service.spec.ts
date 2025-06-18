import { Test, TestingModule } from "@nestjs/testing";
import { ShopService } from "./shop.service";
import { ShopRepository } from "../shop-repository/shop-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("ShopService", () => {
  let service: ShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopService, ShopRepository, PrismaService],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
