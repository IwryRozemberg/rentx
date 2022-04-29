import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

type ImportCategoryRequest = {
  name: string;
  description: string;
};

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<ImportCategoryRequest[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      const categories: ImportCategoryRequest[] = [];

      stream.pipe(parseFile);

      parseFile
        .on("data", async row => {
          const [name, description] = row;

          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", err => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const existingCategory = await this.categoriesRepository.findByName(
        category.name,
      );

      if (!existingCategory) {
        const newCategory = await this.categoriesRepository.create(category);
        return newCategory;
      }

      return null;
    });
  }
}
