import { inject, injectable } from 'tsyringe';

import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  // ja cria o atributo, bem como o inicializa com o valor passado ao constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
