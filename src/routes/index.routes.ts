import { Router } from "express";

import { categoriesRoutes } from "./api/categories.routes";
import { filesRoutes } from "./api/files.routes";
import { specificationsRoutes } from "./api/specifications.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRoutes);
routes.use("/files", filesRoutes);

export { routes };