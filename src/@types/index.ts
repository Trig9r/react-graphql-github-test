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
  primaryLanguage: {
    name: string;
  };
  stargazerCount: number;
}

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
  next_page?: string;
  prev_page?: string;
}

// Используемые языки в репозитории
export interface LanguagesRepoType {
  node: {
    name: string;
  };
}

// Типы для store, выбор и поиск репозитория
export interface FilterSliceState {
  searchValue: string;
  repository: RepositoryFilterProps;
}
export interface RepositoryFilterProps {
  name: string;
  owner: string;
}
