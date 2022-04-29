import { Router } from "express";

import { CreateSpecificationsController } from "../../modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { ListSpecificationsController } from "../../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationsController.handle);
specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
