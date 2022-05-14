import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../config/upload";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { UpdateUserAvatarController } from "../../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ImportCategoryController } from "../../modules/cars/useCases/importCategory/ImportCategoryController";

const filesRoutes = Router();
const defaultUpload = multer(uploadConfig());

const importCategoryController = new ImportCategoryController();
const updateUserAvatarController = new UpdateUserAvatarController();

// filesRoutes.post(
//   "/cars/image",
//   ensureAuthenticated,
//   upload.single("file"),
//   (req, res) => {
//     const { file } = req;
//     console.log(file);
//     return res.send();
//   },
// );

filesRoutes.post(
  "/cars/categories",
  ensureAuthenticated,
  defaultUpload.single("file"),
  importCategoryController.handle,
);

filesRoutes.patch(
  "/users/avatar",
  ensureAuthenticated,
  multer(uploadConfig("avatar", "user-avatar")).single("avatarFile"),
  updateUserAvatarController.handle,
);

export { filesRoutes };
