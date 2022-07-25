import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController";
import { DeleteCarsImagesController } from "@modules/cars/useCases/deleteCarImages/DeleteCarsImagesController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdministrator } from "../../middlewares/ensureAdministrator";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationsController =
  new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();
const deleteCarImagesController = new DeleteCarsImagesController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdministrator,
  createCarsController.handle,
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdministrator,
  createCarsSpecificationsController.handle,
);

carsRoutes.post(
  "/images/:id",
  multer(uploadConfig("car-image")).array("carsImages"),
  ensureAuthenticated,
  ensureAdministrator,
  uploadCarImagesController.handle,
);

carsRoutes.delete(
  "/images",
  ensureAuthenticated,
  ensureAdministrator,
  deleteCarImagesController.handle,
);

export { carsRoutes };
