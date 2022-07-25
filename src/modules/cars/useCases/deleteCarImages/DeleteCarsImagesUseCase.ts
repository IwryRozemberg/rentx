import { inject, injectable } from "tsyringe";

import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { deleteFile } from "@utils/file";

@injectable()
export class DeleteCarsImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: CarsImageRepository,
  ) {}

  async execute(fileNames: string[]): Promise<void> {
    fileNames.map(async fileName => {
      await this.carsImageRepository.delete(fileName);
      deleteFile(`./tmp/${fileName}`);
    });
  }
}
