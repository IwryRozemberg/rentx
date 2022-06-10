import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { CreateCarDTO, ICarsRepository, ListCarsDTO } from "../ICarsRepository";

export class InMemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: CreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);

    return car;
  }
  async findByLicensePlace(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  async findAvailable({
    brand,
    name,
    categoryId,
  }: ListCarsDTO): Promise<Car[]> {
    return this.cars.filter(car => {
      if (
        car.available &&
        ((brand && car.brand === brand) ||
          (name && car.name === name) ||
          (categoryId && car.categoryId === categoryId) ||
          (!brand && !name && !categoryId))
      ) {
        return car;
      }

      return null;
    });
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }
}
