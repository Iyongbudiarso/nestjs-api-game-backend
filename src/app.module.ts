import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { CacheModule } from "@nestjs/cache-manager";
import { createKeyv } from "@keyv/redis";
import { Keyv } from "keyv";
import { CacheableMemory } from "cacheable";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { ShopModule } from "./shop/shop.module";
import { WalletModule } from "./wallet/wallet.module";
import { BattlepassModule } from "./battlepass/battlepass.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            new Keyv({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
              store: new CacheableMemory({ ttl: 6000, lruSize: 5000 }),
            }),
            createKeyv(process.env.REDIS_URL || "redis://localhost:6379"),
          ],
        };
      },
    }),

    PrismaModule,
    UserModule,
    LeaderboardModule,
    ShopModule,
    WalletModule,
    BattlepassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
