import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

type UpdateAvatarRequest = {
  userId: string;
  avatarFile: string;
};

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, avatarFile }: UpdateAvatarRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    const oldAvatar = user.avatar;
    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    if (oldAvatar) {
      deleteFile(`./tmp/avatar/${oldAvatar}`);
    }
  }
}
