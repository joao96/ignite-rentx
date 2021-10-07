import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  // ja cria o atributo, bem como o inicializa com o valor passado ao constructor
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists.');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
