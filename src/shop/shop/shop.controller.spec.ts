import { Test, TestingModule } from "@nestjs/testing";
import { ShopController } from "./shop.controller";
import { JwtModule } from "@nestjs/jwt";
import { ShopService } from "./shop.service";
import { ShopRepository } from "../shop-repository/shop-repository";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("ShopController", () => {
  let controller: ShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
      providers: [ShopService, ShopRepository, PrismaService],
      imports: [JwtModule.register({})],
    }).compile();

    controller = module.get<ShopController>(ShopController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
