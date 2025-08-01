import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "../user-repository/user-repository";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma/prisma.service";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, PrismaService],
      imports: [JwtModule.register({})],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
