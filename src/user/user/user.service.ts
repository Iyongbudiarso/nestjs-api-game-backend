import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../user-repository/user-repository";

export type UserJWT = {
  id: number;
  username: string;
  iat: number;
  exp: number;
};

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await this.generatePasswordHash(password);
    return await this.userRepository.save(username, hashedPassword);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    // TODO: add refresh token
    const payload = { id: user.id, username: user.username } as UserJWT;
    return {
      token_type: "Bearer",
      access_token: await this.jwtService.signAsync(payload),
      expires_in: 3600, // 1 hour
    };
  }

  async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async getUserById(userId: number) {
    return await this.userRepository.findById(userId);
  }
}
