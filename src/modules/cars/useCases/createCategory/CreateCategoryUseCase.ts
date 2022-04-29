import { inject, injectable } from "tsyringe";

import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
      throw new Error(`Category ${name.trim()} already exists`);
    }

    const newCategory = await this.categoriesRepository.create({
      name: name.trim(),
      description,
    });

    return newCategory;
  }
}
