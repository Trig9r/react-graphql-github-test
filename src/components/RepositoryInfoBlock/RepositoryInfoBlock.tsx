/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { RepositoryFilterProps } from '@/@types';
import { useGetRepositoryQuery } from '@/store/github';
import { formatCount } from '@/utils/helpers';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import styles from './styles.module.scss';
import spinnerStyles from '@/styles/css/loading.module.scss';

export const RepositoryInfoBlock: React.FC<RepositoryFilterProps> = ({ name, owner }) => {
  const { isLoading, data: selectedRepository, isError } = useGetRepositoryQuery({ name, owner });

  if (isLoading || isError || !selectedRepository)
    return (
      <span
        className={`${spinnerStyles.loading} ${spinnerStyles.dark_mode}`}
        style={{ top: '45%', left: '50%' }}
      />
    );

  return (
    <>
      <div className={styles.repo__header__info}>
        <h1 className={styles.repo__header__info__title}>{selectedRepository.name}</h1>

        <div className={styles.repo__header__info__sub_info}>
          <Chip
            label={
              selectedRepository.primaryLanguage
                ? selectedRepository.primaryLanguage.name
                : 'Язык не выбран'
            }
            color='primary'
          />
          <Stack direction='row' alignItems='center' spacing={1}>
            <StarIcon style={{ color: '#FFB400' }} />
            <span>{formatCount(selectedRepository.stargazerCount)}</span>
          </Stack>
        </div>

        <Stack direction='row' spacing={1}>
          {selectedRepository.languages.edges.map(({ node }) => (
            <Chip key={node.name} label={node.name} />
          ))}
        </Stack>
      </div>

      <div className={styles.repo__inner__info}>
        <span>
          {selectedRepository.licenseInfo ? selectedRepository.licenseInfo.name : 'No license'}
        </span>
      </div>
    </>
  );
};
