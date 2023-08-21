/* eslint-disable no-nested-ternary */
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid, RepositoryInfoBlock } from '@/components';
import { Footer } from '@/components/Footer';
import { SearchInput } from '@/components/UI/Input';
import { selectFilter } from '@/store/filter/selectors';
import { setSelectedRepository } from '@/store/filter/slice';
import { useLazyGetRepositoriesQuery } from '@/store/github';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';

import styles from './styles.module.scss';
import spinnerStyles from '@/styles/css/loading.module.scss';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { searchValue, repository } = useSelector(selectFilter);

  const [fetchRepos, { isLoading, isError, data }] = useLazyGetRepositoriesQuery();

  const [nextPage, setNextPage] = React.useState<string>('');
  const [prevPage, setPrevPage] = React.useState<string>('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  // Функция для отправки запроса получения репозиториев по поиску
  const fetchRepositories = async (perPage: number, pageCursor?: string) => {
    try {
      const response = await fetchRepos({
        search: searchValue,
        per_page: perPage,
        next_page: pageCursor
      });

      if (response.data && response.data.search.pageInfo.hasNextPage) {
        setNextPage(response.data.search.pageInfo.endCursor);
      }

      if (response.data && response.data.search.pageInfo.hasPreviousPage) {
        setPrevPage(response.data.search.pageInfo.startCursor);
      }
    } catch (error) {
      console.error((error as Error).message);
      toast.error('Ошибка при выполнении запроса');
    }
  };

  // Функция обработки изменения количества записей репозиториев на странице
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    fetchRepositories(newRowsPerPage);
  };

  // Функция обработки поиска
  const handleClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setSelectedRepository({ name: '', owner: '' }));
    fetchRepositories(rowsPerPage);
  };

  // Функция обработки пагинации репозиториев
  const handlePagination = async (direction: 'prev' | 'next') => {
    const pageCursor = direction === 'next' ? nextPage : prevPage;
    fetchRepositories(rowsPerPage, pageCursor);
  };

  // Функция обработки изменения страницы
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    handlePagination(newPage > page ? 'next' : 'prev');
  };

  if (data?.search?.edges.length) {
    document.body.classList.add('has-repo-container');
  } else {
    document.body.classList.remove('has-repo-container');
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <form onSubmit={handleClickSearch}>
            <Stack spacing={1} direction='row'>
              <SearchInput />
              <Button
                type='submit'
                variant='contained'
                size='small'
                className={styles.header__btn_search}
              >
                ИСКАТЬ
              </Button>
            </Stack>
          </form>
        </div>
      </header>

      <div className='container'>
        <section className={styles.content__inner}>
          {isLoading || isError ? (
            <span
              className={`${spinnerStyles.loading} ${spinnerStyles.dark_mode}`}
              style={{ top: '47%', left: '47%' }}
            />
          ) : data?.search?.edges.length ? (
            <>
              <div className={styles.data__container}>
                <h1 className={styles.data__result__title}>Результаты поиска</h1>

                <DataGrid node={data?.search.edges} />

                <TablePagination
                  component='div'
                  count={data.search.repositoryCount}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>

              <div className={styles.repo__container}>
                {repository.name ? (
                  <RepositoryInfoBlock
                    key={`${repository.owner}-${repository.name}`}
                    {...repository}
                  />
                ) : (
                  <span className={styles.select__title}>Выберите репозиторий</span>
                )}
              </div>
            </>
          ) : (
            <div className={styles.title__welcome}>Добро пожаловать</div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};
