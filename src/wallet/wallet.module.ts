import { Module } from "@nestjs/common";
import { WalletController } from "./wallet/wallet.controller";
import { WalletService } from "./wallet/wallet.service";
import { WalletRepository } from "./wallet-repository/wallet-repository";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule {}
