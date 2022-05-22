import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

type SpecificationRequest = {
  name: string;
  description: string;
};

@injectable()
export class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({
    name,
    description,
  }: SpecificationRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name.trim());

    if (specificationAlreadyExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    const newSpecification = await this.specificationsRepository.create({
      name,
      description,
    });

    return newSpecification;
  }
}
