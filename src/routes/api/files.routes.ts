import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ImportCategoryController } from "../../modules/cars/useCases/importCategory/ImportCategoryController";

const filesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});
const importCategoryController = new ImportCategoryController();

filesRoutes.post(
  "/cars/image",
  ensureAuthenticated,
  upload.single("file"),
  (req, res) => {
    const { file } = req;
    console.log(file);
    return res.send();
  },
);

filesRoutes.post(
  "/cars/categories",
  ensureAuthenticated,
  upload.single("file"),
  importCategoryController.handle,
);

export { filesRoutes };
