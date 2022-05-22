import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ISpecificationsRepository,
  SpecificationDTO,
} from "../ISpecificationsRepository";

export class InMemorySpecificationsRepository
  implements ISpecificationsRepository
{
  private specifications: Specification[] = [];

  async create(specification: SpecificationDTO): Promise<Specification> {
    const spec = new Specification();

    Object.assign(spec, specification);
    this.specifications.push(spec);

    return spec;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(spec => spec.name === name);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}
