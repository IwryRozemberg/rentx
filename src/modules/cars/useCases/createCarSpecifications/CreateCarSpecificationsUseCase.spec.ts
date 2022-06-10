import { InMemoryCarsRepository } from "@modules/cars/repositories/inMemory/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "@modules/cars/repositories/inMemory/InMemorySpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsRepository: InMemoryCarsRepository;
let specificationsRepository: InMemorySpecificationsRepository;

describe("Add specifications car", () => {
  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    specificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepository,
      specificationsRepository,
    );
  });

  it("should be able to add a specification car", async () => {
    const car = await carsRepository.create({
      licensePlate: "PRJ-5840",
      name: "Car test name 2",
      description: "Car test description 2",
      dailyRate: 100,
      fineAmount: 50,
      brand: "Car test brand 2",
    });

    const specification = await specificationsRepository.create({
      name: "GLASS",
      description: "VIDROS ELÉTRICOS",
    });

    await createCarSpecificationsUseCase.execute({
      carId: car.id,
      specificationsIds: [specification.id],
    });

    expect(car.specifications).toEqual(
      expect.arrayContaining([expect.objectContaining(specification)]),
    );
  });

  it("should not be able to add a specification with not existing car", async () => {
    expect(async () => {
      await createCarSpecificationsUseCase.execute({
        carId: "123",
        specificationsIds: ["123"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to add a non-existing specification to a car", async () => {
    const car = await carsRepository.create({
      licensePlate: "PRJ-5840",
      name: "Car test name 2",
      description: "Car test description 2",
      dailyRate: 100,
      fineAmount: 50,
      brand: "Car test brand 2",
    });

    expect(async () => {
      await createCarSpecificationsUseCase.execute({
        carId: car.id,
        specificationsIds: ["123"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
