import { Controller, Get, Header } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("healthz")
  @Header("Content-Type", "application/json")
  getHello() {
    return {
      status: this.appService.getStatus(),
    };
  }
}
