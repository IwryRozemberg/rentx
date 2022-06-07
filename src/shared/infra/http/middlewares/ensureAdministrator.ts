import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdministrator(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { userId } = request;
  const userRepository = new UsersRepository();
  const user = await userRepository.findById(userId);

  if (!user.isAdmin) {
    throw new AppError("Not Authorization, user isn`t admin!", 401);
  }

  next();
}
