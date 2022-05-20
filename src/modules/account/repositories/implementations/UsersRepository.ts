import { getRepository, Repository } from "typeorm";

import { User } from "../../model/User";
import { CreateUserDTO, IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driverLicense,
    avatar,
    id,
  }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicense,
      avatar,
      id,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
}
