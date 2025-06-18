import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response, Request as ExpressRequest } from "express";
import { UserJWT } from "src/user/user/user.service";
import { BattlepassService } from "./battlepass.service";
import { UserGuard } from "../../user/user.guard";

@Controller("battlepass")
export class BattlepassController {
  constructor(private battlepassService: BattlepassService) {}

  @Post("activate")
  @UseGuards(UserGuard)
  async updateScore(
    @Request() req: ExpressRequest & { user: UserJWT },
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      await this.battlepassService.active(userId);

      return res.status(200).json({
        statusCode: 200,
        message: "Success activate battlepass",
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "Failed activate battlepass",
      });
    }
  }

  @Get("quests")
  @UseGuards(UserGuard)
  async getQuests(
    @Request() req: ExpressRequest & { user: UserJWT },
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const quests = await this.battlepassService.getQuests(userId);

      return res.status(200).json({
        statusCode: 200,
        data: quests.map((quest) => ({
          id: quest.id,
          questName: quest.questName,
          status: quest.status,
        })),
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "Failed get quests",
      });
    }
  }

  @Get("status")
  @UseGuards(UserGuard)
  async getStatus(
    @Request() req: ExpressRequest & { user: UserJWT },
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const status = await this.battlepassService.getBattlepassStatus(userId);

      return res.status(200).json({
        statusCode: 200,
        data: {
          status,
        },
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "Failed get battlepass status",
      });
    }
  }
}
