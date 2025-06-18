import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response, Request as ExpressRequest } from "express";
import { UserJWT } from "../../user/user/user.service";
import { ShopService } from "./shop.service";
import { UserGuard } from "../../user/user.guard";

@Controller("shop")
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get("items")
  @UseGuards(UserGuard)
  getItems() {
    return this.shopService.getItems();
  }

  @Post("buy")
  @UseGuards(UserGuard)
  async updateScore(
    @Request() req: ExpressRequest & { user: UserJWT },
    @Body("item_id") score: number,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      await this.shopService.buyItem(userId, score);

      return res.status(200).json({
        statusCode: 200,
        message: "Success buy Item",
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "Failed buy Item",
      });
    }
  }
}
