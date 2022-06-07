import { InMemoryCarsRepository } from "@modules/cars/repositories/inMemory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: InMemoryCarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car test name",
      description: "Car test description",
      dailyRate: 10,
      licensePlate: "PRJ-5840",
      fineAmount: 5,
      brand: "Car test brand",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to not create a new car with an existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        licensePlate: "PRJ-5840",
        name: "Car test name",
        description: "Car test description",
        dailyRate: 10,
        fineAmount: 5,
        brand: "Car test brand",
      });

      await createCarUseCase.execute({
        licensePlate: "PRJ-5840",
        name: "Car test name 2",
        description: "Car test description 2",
        dailyRate: 100,
        fineAmount: 50,
        brand: "Car test brand 2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available properties true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car test name",
      description: "Car test description",
      dailyRate: 10,
      licensePlate: "PRJ-5840",
      fineAmount: 5,
      brand: "Car test brand",
    });
    expect(car.available).toBe(true);
  });
});
