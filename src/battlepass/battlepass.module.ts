import { Module } from "@nestjs/common";
import { BattlepassController } from "./battlepass/battlepass.controller";
import { BattlepassService } from "./battlepass/battlepass.service";
import { BattlepassRepository } from "./battlepass-repository/battlepass-repository";
import { PrismaModule } from "../prisma/prisma.module";
import { AdminBattlepassController } from "./battlepass/admin.battlepass.controller";
import { TasksService } from "./battlepass/tasks.service";

@Module({
  imports: [PrismaModule],
  controllers: [BattlepassController, AdminBattlepassController],
  providers: [BattlepassService, BattlepassRepository, TasksService],
})
export class BattlepassModule {}
