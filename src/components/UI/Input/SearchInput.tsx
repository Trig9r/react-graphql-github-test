import React from 'react';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '@/store/filter/slice';
import TextField from '@mui/material/TextField';

import styles from './styles.module.scss';

export const SearchInput: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const updateSearchValue = React.useCallback((str: string) => {
    dispatch(setSearchValue(str));
  }, []);

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <TextField
      value={value}
      variant='outlined'
      placeholder='Введите поисковый запрос'
      size='small'
      className={styles.input_search}
      onChange={handleChangeInputValue}
    />
  );
};
