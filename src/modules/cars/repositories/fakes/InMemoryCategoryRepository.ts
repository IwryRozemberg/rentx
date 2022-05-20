import { Category } from "../../model/Category";
import { CategoryDTO, ICategoriesRepository } from "../ICategoriesRepository";

export class InMemoryCategoryRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }: CategoryDTO): Promise<Category> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }
}
