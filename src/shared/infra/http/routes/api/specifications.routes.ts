import { Router } from "express";

import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { ensureAdministrator } from "../../middlewares/ensureAdministrator";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdministrator,
  createSpecificationsController.handle,
);

specificationsRoutes.get(
  "/",
  ensureAuthenticated,
  listSpecificationsController.handle,
);

export { specificationsRoutes };
