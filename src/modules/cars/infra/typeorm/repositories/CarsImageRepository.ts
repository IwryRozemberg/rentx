import { getRepository, Repository } from "typeorm";

import {
  CreateCarsImageDTO,
  ICarsImageRepository,
} from "@modules/cars/repositories/ICarsImageRepository";

import { CarImage } from "../entities/CarImage";

export class CarsImageRepository implements ICarsImageRepository {
  private carsImageRepository: Repository<CarImage>;

  constructor() {
    this.carsImageRepository = getRepository(CarImage);
  }

  async create({
    carId,
    imageName: image,
  }: CreateCarsImageDTO): Promise<CarImage> {
    const carImage = this.carsImageRepository.create({
      carId,
      imageName: image,
    });
    await this.carsImageRepository.save(carImage);

    return carImage;
  }

  async delete(imageName: string): Promise<void> {
    await this.carsImageRepository.delete({ imageName });
  }
}
