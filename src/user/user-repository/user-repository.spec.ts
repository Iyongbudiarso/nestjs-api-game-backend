import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "./user-repository";
import { PrismaService } from "../../prisma/prisma/prisma.service";

describe("UserRepository", () => {
  let provider: UserRepository;

  const userMock = { id: 1 };
  let createMock: jest.Mock;
  let findUniqueMock: jest.Mock;

  beforeEach(async () => {
    createMock = jest.fn().mockResolvedValue(userMock);
    findUniqueMock = jest.fn().mockResolvedValue(userMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: {
          create: createMock,
          findUnique: findUniqueMock,
        },
      })
      .compile();

    provider = module.get<UserRepository>(UserRepository);
  });

  it("should be defined", () => {
    expect(provider).toBeDefined();
  });

  it("method save", async () => {
    const save = await provider.save("username", "password");
    expect(createMock).toHaveBeenCalledWith({
      data: {
        username: "username",
        password: "password",
      },
    });
    expect(save).toEqual(userMock);
  });

  it("method findByUsername", async () => {
    const find = await provider.findByUsername("username");
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: {
        username: "username",
      },
    });
    expect(find).toEqual(userMock);
  });

  it("method findById", async () => {
    const find = await provider.findById(1);
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
    expect(find).toEqual(userMock);
  });
});
