import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import * as bcrypt from "bcrypt";
import { AppModule } from "./../src/app.module";
import { UserRepository } from "../src/user/user-repository/user-repository";
import { JwtService } from "@nestjs/jwt";

async function generatePasswordHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const userPassword = await generatePasswordHash("password");
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useValue({
        findById: jest.fn().mockResolvedValue({
          id: 1,
          username: "username",
          walletBalance: 10,
          battlepassStatus: 0,
          battlepassExpiredDate: null,
          createdAt: "2022-01-01",
          updatedAt: "2023-01-01",
        }),
        findByUsername: (username: string) => {
          if (username === "username") {
            return Promise.resolve({
              id: 1,
              username: "username",
              password: userPassword,
            });
          } else {
            return Promise.resolve(null);
          }
        },
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true),
      })
      .overrideProvider(JwtService)
      .useValue({
        signAsync: jest.fn().mockResolvedValue("token"),
        verifyAsync: jest.fn().mockResolvedValue({ id: 1 }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/healthz (GET)", () => {
    return request(app.getHttpServer())
      .get("/healthz")
      .expect(200)
      .expect((res) => {
        expect(res.headers["content-type"]).toContain("application/json");
        expect(JSON.parse(res.text)).toEqual({
          status: "OK",
        });
      });
  });

  it("/register (POST)", () => {
    return request(app.getHttpServer())
      .post("/register")
      .send({ username: "username2", password: "password" })
      .expect((res) => {
        expect(JSON.parse(res.text)).toEqual({
          statusCode: 201,
          message: "User registered successfully",
        });
      });
  });

  it("/login (POST)", () => {
    return request(app.getHttpServer())
      .post("/login")
      .send({ username: "username", password: "password" })
      .expect((res) => {
        expect(JSON.parse(res.text)).toEqual({
          statusCode: 200,
          data: {
            access_token: "token",
            expires_in: 3600,
            token_type: "Bearer",
          },
        });
      });
  });

  it("/logout (POST)", () => {
    return request(app.getHttpServer())
      .post("/logout")
      .set("authorization", "Bearer 1")
      .expect((res) => {
        expect(JSON.parse(res.text)).toEqual({
          statusCode: 200,
          message: "User logged out successfully",
        });
      });
  });

  it("/profile (GET)", () => {
    return request(app.getHttpServer())
      .get("/profile")
      .set("authorization", "Bearer 1")
      .expect((res) => {
        expect(JSON.parse(res.text)).toEqual({
          statusCode: 200,
          data: {
            id: 1,
            username: "username",
            wallet_balance: 10,
            battlepass_exp: null,
            battlepass_status: 0,
            created_at: "2022-01-01",
            updated_at: "2023-01-01",
          },
        });
      });
  });

  it("/profile (GET) - Unauthorized", () => {
    return request(app.getHttpServer())
      .get("/profile")
      .expect((res) => {
        expect(JSON.parse(res.text)).toEqual({
          statusCode: 401,
          message: "Unauthorized",
        });
      });
  });
});
