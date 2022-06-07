import { Router } from "express";

import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdministrator } from "../../middlewares/ensureAdministrator";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdministrator,
  createCategoryController.handle,
);

export { categoriesRoutes };
