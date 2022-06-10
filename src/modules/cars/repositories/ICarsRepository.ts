import { Car } from "../infra/typeorm/entities/Car";
import { Specification } from "../infra/typeorm/entities/Specification";

export type CreateCarDTO = {
  id?: string;
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId?: string;
  specifications?: Specification[];
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
  findById(id: string): Promise<Car>;
}
