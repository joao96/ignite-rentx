import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  // ja cria o atributo, bem como o inicializa com o valor passado ao constructor
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
