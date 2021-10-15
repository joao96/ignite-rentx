import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', // nome do container que esta sendo criado (vai referenciar a classe CategoriesRepository)
  CategoriesRepository // a classe que sera chamada toda vez que o nome anterior for referenciado
);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);
