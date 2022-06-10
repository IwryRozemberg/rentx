import { getRepository, Repository } from "typeorm";

import {
  CreateCarDTO,
  ICarsRepository,
  ListCarsDTO,
} from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private carsRepository: Repository<Car>;

  constructor() {
    this.carsRepository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
  }: CreateCarDTO): Promise<Car> {
    const car = this.carsRepository.create({
      id,
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });

    await this.carsRepository.save(car);

    return car;
  }

  async findByLicensePlace(licensePlate: string): Promise<Car> {
    const car = await this.carsRepository.findOne({ licensePlate });

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carsRepository.findOne(id);

    return car;
  }

  async findAvailable({
    name,
    brand,
    categoryId,
  }: ListCarsDTO): Promise<Car[]> {
    const carsQuery = this.carsRepository
      .createQueryBuilder("cars")
      .where("cars.available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("cars.name like :name", { name: `%${name}%` });
    }
    if (categoryId) {
      carsQuery.andWhere("cars.category_id = :categoryId", { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}
