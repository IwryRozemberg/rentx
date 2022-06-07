import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IListCarsRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ categoryId, brand, name }: IListCarsRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      categoryId,
      brand,
      name,
    });

    return cars;
  }
}
