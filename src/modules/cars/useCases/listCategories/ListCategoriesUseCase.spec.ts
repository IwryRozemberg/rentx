import { InMemoryCategoryRepository } from "@modules/cars/repositories/inMemory/InMemoryCategoryRepository";

import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

describe("List all categories", () => {
  it("should be abe to list all categories", async () => {
    const categoriesRepository = new InMemoryCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository,
    );
    const listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepository,
    );

    await createCategoryUseCase.execute({
      name: "SUV",
      description: "veículo utilitário esportivo",
    });

    const category2 = await createCategoryUseCase.execute({
      name: "Example category 2",
      description: "Description example category",
    });

    const category3 = await createCategoryUseCase.execute({
      name: "Example category 3",
      description: "Description example category",
    });
    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "SUV",
          description: "veículo utilitário esportivo",
        }),
        category2,
        category3,
      ]),
    );
  });
});
