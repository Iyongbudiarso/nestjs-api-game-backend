import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response, Request as ExpressRequest } from "express";
import { UserJWT } from "src/user/user/user.service";
import { WalletService } from "./wallet.service";
import { UserGuard } from "../../user/user.guard";

@Controller("wallet")
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post("topup")
  @UseGuards(UserGuard)
  async updateScore(
    @Request() req: ExpressRequest & { user: UserJWT },
    @Body("wallet_balance") score: number,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      await this.walletService.topupWalletBalance(userId, score);

      return res.status(200).json({
        statusCode: 200,
        message: "Success topup",
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "Failed topup",
      });
    }
  }
}
