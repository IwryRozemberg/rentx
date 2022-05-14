import { User } from "../model/User";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  avatar?: string;
  id?: string;
};

interface IUsersRepository {
  create(user: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
