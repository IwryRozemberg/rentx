import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

type CategoryRequest = {
  name: string;
  description: string;
};

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: CategoryRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name.trim(),
    );

    if (categoryAlreadyExists) {
      throw new AppError(`Category ${name.trim()} already exists`);
    }

    const newCategory = await this.categoriesRepository.create({
      name: name.trim(),
      description,
    });

    return newCategory;
  }
}
