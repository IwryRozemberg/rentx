import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { InMemoryCarsRepository } from "@modules/cars/repositories/inMemory/InMemoryCarsRepository";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: InMemoryCarsRepository;
let createCarUseCase: CreateCarUseCase;
let car1: Car;
let car2: Car;
let car3: Car;
let car4: Car;

describe("List Cars", () => {
  beforeEach(async () => {
    carsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    createCarUseCase = new CreateCarUseCase(carsRepository);

    car1 = await createCarUseCase.execute({
      licensePlate: "PRJ-5840",
      name: "Renegade",
      description: "Car test description 1",
      dailyRate: 100,
      fineAmount: 70,
      brand: "Jeep",
      categoryId: "43726b86-4b9a-4a64-afd7-89da1b5421a6",
    });

    car2 = await createCarUseCase.execute({
      licensePlate: "PRJ-5844",
      name: "Compass",
      description: "Car test description 4",
      dailyRate: 180,
      fineAmount: 110,
      brand: "Jeep",
      categoryId: "43726b86-4b9a-4a64-afd7-89da1b5421a6",
    });

    car3 = await createCarUseCase.execute({
      licensePlate: "PRJ-5841",
      name: "Audi A3",
      description: "Car test description 2",
      dailyRate: 120,
      fineAmount: 80,
      brand: "Audi",
      categoryId: "4d61a7ed-55ae-40aa-87a9-b3cabe5de028",
    });

    car4 = await createCarUseCase.execute({
      licensePlate: "PRJ-5842",
      name: "Audi A4",
      description: "Car test description 3",
      dailyRate: 120,
      fineAmount: 100,
      brand: "Audi",
      categoryId: "e718d89f-932c-4a92-aad5-c2a31b3475e7",
    });
    car4.available = false;
  });

  it("should be able to list all available cars", async () => {
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBe(3);
  });

  it("should be able to list all available cars by name", async () => {
    const cars = await listAvailableCarsUseCase.execute({ name: "Audi A3" });

    expect(cars).toEqual([expect.objectContaining({ name: "Audi A3" })]);
    expect(cars.length).toBe(1);
  });

  it("should be able to list all available cars by brand", async () => {
    const cars = await listAvailableCarsUseCase.execute({ brand: "Jeep" });

    expect(cars).toEqual([car1, expect.objectContaining({ brand: "Jeep" })]);
    expect(cars.length).toBe(2);
  });

  it("should be able to list all available cars by category id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      categoryId: "43726b86-4b9a-4a64-afd7-89da1b5421a6",
    });

    expect(cars).toEqual([
      car1,
      expect.objectContaining({
        categoryId: "43726b86-4b9a-4a64-afd7-89da1b5421a6",
      }),
    ]);
    expect(cars.length).toBe(2);
  });
});
