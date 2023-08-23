import request from 'graphql-request';

import {
  RepositoryDataProps,
  RepositoryFilterProps,
  SearchDataProps,
  SearchRequestProps,
  SelectedRepositoryType
} from '@/@types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: async ({ body }) => {
    const response = await request(
      'https://api.github.com/graphql',
      body,
      {},
      { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
    );
    return { data: response };
  },
  endpoints: (builder) => ({
    GetRepositories: builder.query<SearchDataProps, SearchRequestProps>({
      query: ({ search, per_page, next_page, prev_page, sortProperty, sortDirection }) => ({
        body: `
        query GetRepositories {
          search(query: "${search} sort:${sortProperty}-${sortDirection}" type: REPOSITORY first: ${per_page} ${
            next_page ? `after: "${next_page}"` : ''
          } ${prev_page ? `before: "${prev_page}"` : ''} ) {
            repositoryCount
            pageInfo {
              startCursor
              hasNextPage
              endCursor
              hasPreviousPage
            }
            edges {
              node {
                ... on Repository {
                  name
                  primaryLanguage {
                    name
                  }
                  stargazerCount
                  updatedAt
                  forks {
                    totalCount
                  }
                  owner {
                    login
                  }
                }
              }
            }
          }
        }
        `
      })
    }),
    GetRepository: builder.query<SelectedRepositoryType, RepositoryFilterProps>({
      query: ({ name, owner }) => ({
        body: `
        query getRepository {
          repository(name: "${name}", owner: "${owner}") {
            name
            stargazerCount
            primaryLanguage {
              name
            }
            languages(first: 4) {
              edges {
                node {
                  name
                }
              }
            }
            licenseInfo {
              name
            }
          }
        }
        `
      }),
      transformResponse: (response: RepositoryDataProps) => response.repository
    })
  })
});

export const { useGetRepositoryQuery, useLazyGetRepositoriesQuery } = githubApi;
