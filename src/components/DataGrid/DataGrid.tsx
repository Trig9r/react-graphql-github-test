/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import { SearchRepositoriesType } from '@/@types';
import { setSelectedRepository } from '@/store/filter/slice';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import styles from './styles.module.scss';

interface DataGridProps {
  node: SearchRepositoriesType[];
}

export const DataGrid: React.FC<DataGridProps> = ({ node }) => {
  const dispatch = useDispatch();

  const [orderDirection, setOrderDirection] = React.useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = React.useState('name');

  const handleRequestSort = (property: string) => {
    const isAsc = valueToOrderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setValueToOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    const comparator = (a: string, b: string) => {
      if (orderDirection === 'asc') {
        return a.localeCompare(b);
      }
      return b.localeCompare(a);
    };

    return node.slice().sort((a: SearchRepositoriesType, b: SearchRepositoriesType) => {
      if (valueToOrderBy === 'name') {
        return comparator(a.node.name, b.node.name);
      }
      if (valueToOrderBy === 'lang') {
        return comparator(a.node.primaryLanguage.name || '', b.node.primaryLanguage.name || '');
      }
      if (valueToOrderBy === 'countFork') {
        const diff = a.node.forks.totalCount - b.node.forks.totalCount;
        return orderDirection === 'asc' ? diff : -diff;
      }
      if (valueToOrderBy === 'countStar') {
        const diff = a.node.stargazerCount - b.node.stargazerCount;
        return orderDirection === 'asc' ? diff : -diff;
      }
      if (valueToOrderBy === 'dateUpdate') {
        const dateDiff =
          new Date(a.node.updatedAt).getTime() - new Date(b.node.updatedAt).getTime();

        if (orderDirection === 'asc') {
          return dateDiff;
        }
        return -dateDiff;
      }
      return 0;
    });
  }, [node, orderDirection, valueToOrderBy]);

  const handleSelectRepository = (name: string, owner: string) => {
    dispatch(setSelectedRepository({ name, owner }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 912 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell key='name'>
              <TableSortLabel
                active={valueToOrderBy === 'name'}
                direction={orderDirection === 'asc' ? 'asc' : 'desc'}
                className={styles.reverse_sort_label}
                onClick={() => handleRequestSort('name')}
              >
                Название
              </TableSortLabel>
            </TableCell>

            <TableCell key='lang'>
              <TableSortLabel
                active={valueToOrderBy === 'lang'}
                className={styles.reverse_sort_label}
                direction={orderDirection === 'asc' ? 'asc' : 'desc'}
                onClick={() => handleRequestSort('lang')}
              >
                Язык
              </TableSortLabel>
            </TableCell>

            <TableCell key='countFork'>
              <TableSortLabel
                active={valueToOrderBy === 'countFork'}
                className={styles.reverse_sort_label}
                direction={orderDirection === 'asc' ? 'asc' : 'desc'}
                onClick={() => handleRequestSort('countFork')}
              >
                Число форков
              </TableSortLabel>
            </TableCell>

            <TableCell key='countStar'>
              <TableSortLabel
                active={valueToOrderBy === 'countStar'}
                className={styles.reverse_sort_label}
                direction={orderDirection === 'asc' ? 'asc' : 'desc'}
                onClick={() => handleRequestSort('countStar')}
              >
                Число звёзд
              </TableSortLabel>
            </TableCell>

            <TableCell key='dateUpdate'>
              <TableSortLabel
                active={valueToOrderBy === 'dateUpdate'}
                className={styles.reverse_sort_label}
                direction={orderDirection === 'asc' ? 'asc' : 'desc'}
                onClick={() => handleRequestSort('dateUpdate')}
              >
                Дата добавления
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData.map(({ node }) => (
            <TableRow
              key={`${node.name} ${node.stargazerCount}`}
              onClick={() => handleSelectRepository(node.name, node.owner.login)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell component='th' scope='row'>
                {node.name}
              </TableCell>
              <TableCell>{node.primaryLanguage ? node.primaryLanguage.name : ''}</TableCell>
              <TableCell>{node.forks.totalCount}</TableCell>
              <TableCell>{node.stargazerCount}</TableCell>
              <TableCell>{node.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
