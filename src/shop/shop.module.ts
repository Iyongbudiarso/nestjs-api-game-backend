import { Module } from "@nestjs/common";
import { ShopController } from "./shop/shop.controller";
import { ShopService } from "./shop/shop.service";
import { ShopRepository } from "./shop-repository/shop-repository";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ShopController],
  providers: [ShopService, ShopRepository],
})
export class ShopModule {}
