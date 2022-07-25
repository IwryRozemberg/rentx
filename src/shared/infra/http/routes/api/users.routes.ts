import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  multer(uploadConfig("user-avatar")).single("avatarFile"),
  updateUserAvatarController.handle,
);

export { userRoutes };
