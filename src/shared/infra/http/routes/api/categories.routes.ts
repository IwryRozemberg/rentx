import { Router } from "express";

import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  createCategoryController.handle,
);

categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);

export { categoriesRoutes };
