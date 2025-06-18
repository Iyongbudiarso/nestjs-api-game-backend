import { Injectable } from "@nestjs/common";
import { BattlepassRepository } from "../battlepass-repository/battlepass-repository";

@Injectable()
export class BattlepassService {
  constructor(private battlepassRepository: BattlepassRepository) {}

  async active(userId: number) {
    const success = await this.battlepassRepository.active(userId);
    if (!success) {
      throw new Error("Activate failed");
    }
  }

  async getQuests(userId: number) {
    return await this.battlepassRepository.getQuests(userId);
  }

  async getBattlepassStatus(userId: number) {
    return await this.battlepassRepository.getBattlepassStatus(userId);
  }

  async deactive(userId: number) {
    const success = await this.battlepassRepository.deactive(userId);
    if (!success) {
      throw new Error("Deactivate failed");
    }
  }
}
