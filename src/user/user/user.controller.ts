import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { Response, Request as ExpressRequest } from "express";

import { UserService, UserJWT } from "./user.service";
import { UserGuard } from "../user.guard";

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post("register")
  async userRegister(
    @Body("username") username: string,
    @Body("password") password: string,
    @Res() res: Response,
  ) {
    try {
      await this.userService.register(username, password);

      return res.status(HttpStatus.CREATED).json({
        statusCode: 201,
        message: "User registered successfully",
      });
    } catch (error: unknown) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message:
          error instanceof Error ? error.message : "User registration failed",
      });
    }
  }

  @Post("login")
  async userLogin(
    @Body("username") username: string,
    @Body("password") password: string,
    @Res() res: Response,
  ) {
    try {
      const userToken = await this.userService.login(username, password);

      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        data: userToken,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: (error as Error)?.message || "User login failed",
      });
    }
  }

  @Post("logout")
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  userLogout() {
    // TODO: remove refresh token
    return {
      statusCode: 200,
      message: "User logged out successfully",
    };
  }

  @Get("profile")
  @UseGuards(UserGuard)
  async getProfile(@Request() req: ExpressRequest & { user: UserJWT }) {
    const user = await this.userService.getUserById(req.user.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      statusCode: 200,
      data: {
        id: user.id,
        username: user.username,
        wallet_balance: Number(user.walletBalance) || 0,
        battlepass_status: user.battlepassStatus,
        battlepass_exp: user.battlepassExpiredDate,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    };
  }
}
