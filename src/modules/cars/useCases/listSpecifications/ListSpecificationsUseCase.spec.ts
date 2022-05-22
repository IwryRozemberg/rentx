import { InMemorySpecificationsRepository } from "@modules/cars/repositories/inMemory/InMemorySpecificationsRepository";

import { CreateSpecificationsUseCase } from "../createSpecifications/CreateSpecificationsUseCase";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

describe("List all specifications", () => {
  it("should be able to list all specifications", async () => {
    const specificationsRepository = new InMemorySpecificationsRepository();
    const createSpecificationsUseCase = new CreateSpecificationsUseCase(
      specificationsRepository,
    );
    const listSpecificationsUseCase = new ListSpecificationsUseCase(
      specificationsRepository,
    );

    await createSpecificationsUseCase.execute({
      name: "4x4",
      description: "Veículo com tração nas quatro rodas",
    });

    const specification2 = await createSpecificationsUseCase.execute({
      name: "specification example",
      description: "example description",
    });

    const specification3 = await createSpecificationsUseCase.execute({
      name: "specification example 2",
      description: "example description 2",
    });

    const specifications = await listSpecificationsUseCase.execute();

    expect(specifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "4x4",
          description: "Veículo com tração nas quatro rodas",
        }),
        specification2,
        specification3,
      ]),
    );
  });
});
