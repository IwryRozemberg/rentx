import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

export class CreateCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specificationsIds } = request.body;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationsUseCase,
    );
    const car = await createCarSpecificationsUseCase.execute({
      carId: id,
      specificationsIds,
    });

    return response.json(car);
  }
}
