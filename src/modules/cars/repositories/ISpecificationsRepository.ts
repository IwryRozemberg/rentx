import { Specification } from "../infra/typeorm/entities/Specification";

type SpecificationDTO = {
  name: string;
  description: string;
};

interface ISpecificationsRepository {
  create(specification: SpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByIds(idList: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, SpecificationDTO };
