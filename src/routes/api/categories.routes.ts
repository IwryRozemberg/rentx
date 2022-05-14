import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import CreateCategoryController from "../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../modules/cars/useCases/listCategories/ListCategoriesController";

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
