import { Injectable } from "@nestjs/common";
import { WalletRepository } from "../wallet-repository/wallet-repository";

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  async topupWalletBalance(userId: number, balance: number) {
    const success =
      await this.walletRepository.topupWalletBalanceWithTransaction(
        userId,
        balance,
      );
    if (!success) {
      throw new Error("Topup failed");
    }
  }
}
