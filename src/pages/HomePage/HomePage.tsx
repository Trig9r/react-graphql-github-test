/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DataGrid, RepositoryInfoBlock } from '@/components';
import { Footer } from '@/components/Footer';
import { SearchInput } from '@/components/UI/Input';
import { ERROR_MESSAGE } from '@/constants';
import { selectFilter } from '@/store/filter/selectors';
import { setSelectedRepository } from '@/store/filter/slice';
import { setRepositories, useLazyGetRepositoriesQuery } from '@/store/github';
import { selectRepositories } from '@/store/github/selectors';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';

import styles from './styles.module.scss';
import spinnerStyles from '@/styles/css/loading.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchValue, repository, sortProperty, sortDirection } = useSelector(selectFilter);
  const { search: searchedRepository } = useSelector(selectRepositories);

  const [fetchRepos, { isLoading, isError, data }] = useLazyGetRepositoriesQuery();

  const [nextPage, setNextPage] = React.useState<string>('');
  const [prevPage, setPrevPage] = React.useState<string>('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [hasFetched, setHasFetched] = React.useState(false);

  // Функция для отправки запроса получения репозиториев по поиску
  const fetchRepositories = async (perPage: number, next_page?: string, prev_page?: string) => {
    try {
      const response = await fetchRepos({
        search: searchValue,
        per_page: perPage,
        next_page,
        prev_page,
        sortProperty,
        sortDirection
      });

      if (response.data) {
        dispatch(setRepositories(response.data.search));

        if (response.data.search.pageInfo.hasNextPage) {
          setNextPage(response.data.search.pageInfo.endCursor);
        }

        if (response.data.search.pageInfo.hasPreviousPage) {
          setPrevPage(response.data.search.pageInfo.startCursor);
        }
      }
    } catch (error) {
      console.error((error as Error).message);
      toast.error(ERROR_MESSAGE);
    }
  };

  // Функция обработки изменения количества записей репозиториев на странице
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    fetchRepositories(newRowsPerPage, nextPage, prevPage);
  };

  // Функция обработки поиска
  const handleClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setSelectedRepository({ name: '', owner: '' }));
    fetchRepositories(rowsPerPage);
  };

  // Функция обработки изменения страницы
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    fetchRepositories(rowsPerPage, nextPage, prevPage);
  };

  React.useEffect(() => {
    if (hasFetched) {
      fetchRepositories(rowsPerPage);
    } else {
      setHasFetched(true);
    }
  }, [sortProperty, sortDirection]);

  if (data?.search?.edges.length) {
    document.body.classList.add('has-repo-container');
  } else {
    document.body.classList.remove('has-repo-container');
  }

  if (isError) {
    navigate('/404');
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
          {isLoading ? (
            <span
              className={`${spinnerStyles.loading} ${spinnerStyles.dark_mode}`}
              style={{ top: '47%', left: '47%' }}
            />
          ) : searchedRepository.repositoryCount ? (
            <>
              <div className={styles.data__container}>
                <h1 className={styles.data__result__title}>Результаты поиска</h1>

                <DataGrid />

                <TablePagination
                  component='div'
                  count={searchedRepository.repositoryCount}
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
