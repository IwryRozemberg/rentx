import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

type CarsSpecificationRequest = {
  carId: string;
  specificationsIds: string[];
};

@injectable()
export class CreateCarSpecificationsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    carId,
    specificationsIds,
  }: CarsSpecificationRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError(`Car not found: ${carId}`);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsIds,
    );

    if (specifications.length === 0) {
      throw new AppError(`Specifications not found: ${specificationsIds}`);
    }

    carExists.specifications = specifications;
    const car = await this.carsRepository.create(carExists);

    return car;
  }
}
