import { Specification } from "../model/Specification";

type SpecificationDTO = {
  name: string;
  description: string;
};

interface ISpecificationsRepository {
  create(specification: SpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository, SpecificationDTO };
