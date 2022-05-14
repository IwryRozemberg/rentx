import { inject, injectable } from "tsyringe";

import { User } from "../../model/User";
import {
  CreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

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
      throw new Error(
        `this e-mail ${userAlreadyExists.email} already exists another user`,
      );
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
      driverLicense,
    });

    return user;
  }
}
