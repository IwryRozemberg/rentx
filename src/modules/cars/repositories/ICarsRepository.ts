import { Car } from "../infra/typeorm/entities/Car";

export type CreateCarDTO = {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId?: string;
};

export type ListCarsDTO = {
  categoryId?: string;
  brand?: string;
  name?: string;
};

export interface ICarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlace(licensePlate: string): Promise<Car>;
  findAvailable(data: ListCarsDTO): Promise<Car[]>;
}
