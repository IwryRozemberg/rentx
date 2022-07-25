import { inject, injectable } from "tsyringe";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";

type CarImageRequest = {
  carId: string;
  fileNames: string[];
};

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository,
  ) {}

  async execute({
    carId,
    fileNames: images,
  }: CarImageRequest): Promise<CarImage[]> {
    const carImage: CarImage[] = [];
    images.map(async image => {
      const carImg = await this.carsImageRepository.create({
        carId,
        imageName: image,
      });
      carImage.push(carImg);
    });

    return carImage;
  }
}
