import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const newCategory = await createCategoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(newCategory);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}

export default CreateCategoryController;