import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdministrator } from "../../middlewares/ensureAdministrator";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdministrator,
  createCarsController.handle,
);

carsRoutes.get("/available", listAvailableCarsController.handle); ///

export { carsRoutes };
