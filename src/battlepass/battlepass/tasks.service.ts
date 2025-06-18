import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { BattlepassRepository } from "../battlepass-repository/battlepass-repository";

@Injectable()
export class TasksService {
  constructor(private battlepassRepository: BattlepassRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    void this.battlepassRepository.deactiveUserExpire();
  }
}
