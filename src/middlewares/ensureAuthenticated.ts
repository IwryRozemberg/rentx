import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../erros/AppError";
import { UsersRepository } from "../modules/account/repositories/implementations/UsersRepository";

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
    console.log(user);
    if (!user) {
      throw new AppError("User invalid", 401);
    }

    next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}
