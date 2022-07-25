import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;

    const images = request.files as IFiles[];
    const fileNames = images.map(img => img.filename);

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);
    const imgCars = uploadCarImagesUseCase.execute({
      carId,
      fileNames,
    });

    return response.status(201).json(imgCars);
  }
}
