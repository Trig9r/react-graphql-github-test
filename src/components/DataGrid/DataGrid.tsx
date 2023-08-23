/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SortPropertyType } from '@/@types';
import { SORT_ASC, SORT_DESC, SORT_PROPERTY, TABLE_HEADER } from '@/constants';
import { selectFilter } from '@/store/filter/selectors';
import { setSelectedRepository, setSortDirection, setSortProperty } from '@/store/filter/slice';
import { selectRepositories } from '@/store/github/selectors';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import styles from './styles.module.scss';

export const DataGrid: React.FC = () => {
  const dispatch = useDispatch();

  const { sortDirection, sortProperty } = useSelector(selectFilter);
  const { search: searchedRepository } = useSelector(selectRepositories);

  const handleChangeSort = (property: SortPropertyType) => {
    const isAsc = sortProperty === property && sortDirection === SORT_ASC;
    dispatch(setSortDirection(isAsc ? SORT_DESC : SORT_ASC));
    dispatch(setSortProperty(property));
  };

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
                active={sortProperty === 'name'}
                direction={sortDirection === SORT_ASC ? SORT_ASC : SORT_DESC}
                className={styles.reverse_sort_label}
                onClick={() => handleChangeSort('name')}
              >
                {TABLE_HEADER.ROW_NAME}
              </TableSortLabel>
            </TableCell>

            <TableCell key='lang'>
              <TableSortLabel
                active={sortProperty === 'lang'}
                className={styles.reverse_sort_label}
                direction={sortDirection === SORT_ASC ? SORT_ASC : SORT_DESC}
                onClick={() => handleChangeSort('lang')}
              >
                {TABLE_HEADER.ROW_LANG}
              </TableSortLabel>
            </TableCell>

            <TableCell key='forks'>
              <TableSortLabel
                active={sortProperty === SORT_PROPERTY.FORKS_COUNT}
                className={styles.reverse_sort_label}
                direction={sortDirection === SORT_ASC ? SORT_ASC : SORT_DESC}
                onClick={() => handleChangeSort('forks')}
              >
                {TABLE_HEADER.ROW_COUNT_FORKS}
              </TableSortLabel>
            </TableCell>

            <TableCell key='stars'>
              <TableSortLabel
                active={sortProperty === SORT_PROPERTY.STARS}
                className={styles.reverse_sort_label}
                direction={sortDirection === SORT_ASC ? SORT_ASC : SORT_DESC}
                onClick={() => handleChangeSort('stars')}
              >
                {TABLE_HEADER.ROW_COUNT_STARS}
              </TableSortLabel>
            </TableCell>

            <TableCell key={SORT_PROPERTY.UPDATED}>
              <TableSortLabel
                active={sortProperty === SORT_PROPERTY.UPDATED}
                className={styles.reverse_sort_label}
                direction={sortDirection === SORT_ASC ? SORT_ASC : SORT_DESC}
                onClick={() => handleChangeSort('updated')}
              >
                {TABLE_HEADER.ROW_DATE_UPDATE}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {searchedRepository.edges.map(({ node }) => (
            <TableRow
              key={`${node.name} ${node.updatedAt}`}
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
