import { Router } from "express";

import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  createSpecificationsController.handle,
);
specificationsRoutes.get(
  "/",
  ensureAuthenticated,
  listSpecificationsController.handle,
);

export { specificationsRoutes };
