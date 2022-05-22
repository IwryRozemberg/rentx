import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Invalid headers authorization, token missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Invalid token authorization", 401);
  }

  try {
    const { sub: user_id } = verify(token, process.env.SECRET_KEY_JWT);

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id.toString());
    request.userId = user.id;
    if (!user) {
      throw new AppError("User invalid", 401);
    }

    next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}
