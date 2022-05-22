import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/account/infra/typeorm/entities/User";
import {
  CreateUserDTO,
  IUsersRepository,
} from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driverLicense,
  }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(
        `this e-mail ${userAlreadyExists.email} already exists another user`,
      );
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driverLicense,
    });

    return user;
  }
}
