import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import "../../container";

import { AppError } from "@shared/errors/AppError";

import swaggerDocument from "../../../swagger.json";
import createConnection from "../typeorm";
import { routes } from "./routes";

createConnection();
dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "3333";

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(port, () => {
  console.log(`⚡️ [SERVER] listening at https://localhost:${port}`);
});
