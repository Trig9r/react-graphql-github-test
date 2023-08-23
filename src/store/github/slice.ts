import { SearchDataProps, SearchType } from '@/@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchDataProps = {
  search: {
    repositoryCount: 0,
    pageInfo: {
      startCursor: '',
      hasNextPage: false,
      endCursor: '',
      hasPreviousPage: false
    },
    edges: [
      {
        node: {
          name: '',
          stargazerCount: 0,
          updatedAt: '',
          forks: {
            totalCount: 0
          },
          primaryLanguage: null,
          owner: {
            login: ''
          }
        }
      }
    ]
  }
};

const repoSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepositories(state, action: PayloadAction<SearchType>) {
      state.search = action.payload;
    }
  }
});

export const { setRepositories } = repoSlice.actions;

export default repoSlice.reducer;
