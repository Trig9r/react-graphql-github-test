import {
  FilterSliceState,
  RepositoryFilterProps,
  SortDirectionType,
  SortPropertyType
} from '@/@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterSliceState = {
  searchValue: '',
  sortProperty: 'name',
  sortDirection: 'asc',
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
    },
    setSortProperty(state, action: PayloadAction<SortPropertyType>) {
      state.sortProperty = action.payload;
    },
    setSortDirection(state, action: PayloadAction<SortDirectionType>) {
      state.sortDirection = action.payload;
    }
  }
});

export const { setSearchValue, setSelectedRepository, setSortProperty, setSortDirection } =
  filterSlice.actions;

export default filterSlice.reducer;
