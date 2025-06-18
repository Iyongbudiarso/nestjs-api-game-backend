import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { BattlepassService } from "./battlepass.service";
import { UserGuard } from "../../user/user.guard";

@Controller("admin/battlepass")
export class AdminBattlepassController {
  constructor(private battlepassService: BattlepassService) {}

  @Post("expire")
  @UseGuards(UserGuard)
  async setExpire(@Body("user_id") userId: string, @Res() res: Response) {
    try {
      await this.battlepassService.deactive(Number(userId));

      return res.status(200).json({
        statusCode: 200,
        message: "Success expire battlepass",
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "Failed expire battlepass",
      });
    }
  }
}
