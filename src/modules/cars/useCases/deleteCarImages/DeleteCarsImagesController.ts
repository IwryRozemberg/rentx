import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCarsImagesUseCase } from "./DeleteCarsImagesUseCase";

export class DeleteCarsImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { fileNames } = request.body;

    const deleteCarsImagesUseCase = container.resolve(DeleteCarsImagesUseCase);
    await deleteCarsImagesUseCase.execute(fileNames);

    return response.status(204).send();
  }
}
