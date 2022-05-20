import dotenv from "dotenv";

import { AppError } from "../../../../errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/fakes/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

dotenv.config();

let userRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

const userInfo = {
  email: "user@example.com",
  name: "John Doe",
  password: "123456",
  driverLicense: "Dud3",
};

describe("Authenticate User", () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);

    await createUserUseCase.execute(userInfo);
  });

  it("should be able to authenticate an return token with exists user", async () => {
    const { password, email } = userInfo;

    const authResponse = await authenticateUserUseCase.execute({
      email,
      password,
    });

    expect(authResponse).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "example@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an invalid password", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: userInfo.email,
        password: "errorPass",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
