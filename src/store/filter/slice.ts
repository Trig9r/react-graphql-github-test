import { FilterSliceState, RepositoryFilterProps } from '@/@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterSliceState = {
  searchValue: '',
  repository: {
    name: '',
    owner: ''
  }
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSelectedRepository(state, action: PayloadAction<RepositoryFilterProps>) {
      state.repository = action.payload;
    }
  }
});

export const { setSearchValue, setSelectedRepository } = filterSlice.actions;

export default filterSlice.reducer;
