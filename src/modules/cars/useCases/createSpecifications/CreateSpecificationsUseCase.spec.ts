import { InMemorySpecificationsRepository } from "@modules/cars/repositories/inMemory/InMemorySpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

let specificationsRepository: InMemorySpecificationsRepository;
let createSpecificationsUseCase: CreateSpecificationsUseCase;

describe("Create specifications", () => {
  beforeEach(() => {
    specificationsRepository = new InMemorySpecificationsRepository();
    createSpecificationsUseCase = new CreateSpecificationsUseCase(
      specificationsRepository,
    );
  });

  it("should be able to create a new specification", async () => {
    const specification = await createSpecificationsUseCase.execute({
      name: "specification example",
      description: "example description",
    });

    expect(specification).toHaveProperty("id");
  });

  it("should be not able to create a new specification with a same name", async () => {
    expect(async () => {
      const specInfo = {
        name: "specification example",
        description: "example description",
      };

      await createSpecificationsUseCase.execute(specInfo);
      await createSpecificationsUseCase.execute(specInfo);
    }).rejects.toBeInstanceOf(AppError);
  });
});
