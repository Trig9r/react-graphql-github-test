import { SORT_ASC, SORT_DESC } from '@/constants';

// Общий объект возвращаемый api по поиску
export interface SearchDataProps {
  search: SearchType;
}

export interface RepositoryDataProps {
  repository: SelectedRepositoryType;
}

// Структура объекта результата по поиску
export interface SearchType {
  repositoryCount: number;
  pageInfo: RepositoriesPageInfo;
  edges: SearchRepositoriesType[];
}

// Объект с содержимым репозитория
export interface SearchRepositoriesType {
  node: SearchRepositoryType;
}

// Базовая информация репозитория
export interface RepositoryType {
  name: string;
  primaryLanguage: PrimaryLanguageType;
  stargazerCount: number;
}

export type PrimaryLanguageType = null | { name: string };

// Дополнительная информация репозитория по поиску
export interface SearchRepositoryType extends RepositoryType {
  updatedAt: string;
  forks: {
    totalCount: number;
  };
  owner: {
    login: string;
  };
}

// Дополнительная информация выбранного репозитория
export interface SelectedRepositoryType extends RepositoryType {
  languages: { edges: LanguagesRepoType[] };
  licenseInfo: {
    name: string;
  };
}

// Типизация пагинации для репозиториев
export interface RepositoriesPageInfo {
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
  hasPreviousPage: boolean;
}

// Необходимые и необязательные параметры для отправки запроса
export interface SearchRequestProps {
  search: string;
  per_page: number;
  sortProperty: SortPropertyType;
  sortDirection: SortDirectionType;
  next_page?: string;
  prev_page?: string;
}

// Используемые языки в репозитории
export interface LanguagesRepoType {
  node: {
    name: string;
  };
}

// Тип направления сортировки
export type SortDirectionType = typeof SORT_ASC | typeof SORT_DESC;

// Тип полей сортировки
export type SortPropertyType = 'name' | 'stars' | 'updated' | 'forks' | 'lang';

// Типы для store, выбор и поиск репозитория
export interface FilterSliceState {
  searchValue: string;
  sortProperty: SortPropertyType;
  sortDirection: SortDirectionType;
  repository: RepositoryFilterProps;
}

export interface RepositoryFilterProps {
  name: string;
  owner: string;
}
