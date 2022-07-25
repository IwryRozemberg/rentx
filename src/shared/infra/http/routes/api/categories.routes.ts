import { Router } from "express";
import multer from "multer";

import configUpload from "@config/upload";
import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdministrator } from "../../middlewares/ensureAdministrator";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdministrator,
  createCategoryController.handle,
);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  multer(configUpload()).single("file"),
  importCategoryController.handle,
);

export { categoriesRoutes };
