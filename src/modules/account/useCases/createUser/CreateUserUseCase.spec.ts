import { InMemoryUsersRepository } from "@modules/account/repositories/inMemory/InMemoryUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUsersRepository;

const userInfo = {
  email: "user@example.com",
  name: "John Doe",
  password: "123456",
  driverLicense: "Dud3",
};

describe("Create user", () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);

    await createUserUseCase.execute(userInfo);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "User example",
      email: "example@example.com",
      driverLicense: "13249",
      password: "password",
    });

    expect(user).toHaveProperty("id");
  });

  it("should be not able to create a new user with an same email", async () => {
    expect(async () => {
      await createUserUseCase.execute(userInfo);
    }).rejects.toBeInstanceOf(AppError);
  });
});
