import { InMemoryCategoryRepository } from "@modules/cars/repositories/inMemory/InMemoryCategoryRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepository: InMemoryCategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create a new category", () => {
  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Example category",
      description: "Description example category",
    });

    expect(category).toHaveProperty("id");
  });

  it("should not be able to create a new category with an same name", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Example category exists",
        description: "Description example category exists",
      });

      await createCategoryUseCase.execute({
        name: "Example category exists",
        description: "Description example category exists",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
