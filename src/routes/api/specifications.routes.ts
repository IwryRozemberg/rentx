import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { CreateSpecificationsController } from "../../modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { ListSpecificationsController } from "../../modules/cars/useCases/listSpecifications/ListSpecificationsController";

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
