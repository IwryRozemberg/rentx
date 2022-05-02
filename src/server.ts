import dotenv from "dotenv";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";
import { routes } from "./routes";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "3333";

// AppDataSource.initialize()
//   .then(async dataSource => {
//     console.log("Data Source has been initialized");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.listen(port, () => {
  console.log(`⚡️ [SERVER] listening at https://localhost:${port}`);
});

// console.log(dataSource.migrations);
//   await dataSource.runMigrations();
// })
// .catch(error => {
//   console.error("Error during Data Source initialization: ", error);
// });
