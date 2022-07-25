import { CarImage } from "../infra/typeorm/entities/CarImage";

export type CreateCarsImageDTO = {
  carId: string;
  imageName: string;
};

export interface ICarsImageRepository {
  create(data: CreateCarsImageDTO): Promise<CarImage>;
  delete(imageName: string): Promise<void>;
}
