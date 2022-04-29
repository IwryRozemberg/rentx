import { Category } from "../model/Category";

type CategoryDTO = {
  name: string;
  description: string;
};

interface ICategoriesRepository {
  create({ name, description }: CategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, CategoryDTO };
