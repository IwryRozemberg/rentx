import { Router } from "express";

import { authRoutes } from "./api/auth.routes";
import { carsRoutes } from "./api/cars.routes";
import { categoriesRoutes } from "./api/categories.routes";
import { specificationsRoutes } from "./api/specifications.routes";
import { userRoutes } from "./api/users.routes";

const routes = Router();

routes.use(authRoutes);
routes.use("/cars", carsRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRoutes);
routes.use("/users", userRoutes);

export { routes };
