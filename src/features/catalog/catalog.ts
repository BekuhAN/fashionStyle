import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CatalogState {
  activeCategory: number,
  priceRange: Array<number>,
}

const initialState: CatalogState = {
  activeCategory: 0,
  priceRange: [0, 100000],
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload
    },
    setPriceRange: (state, action: PayloadAction<Array<number>>) => {
      state.priceRange = action.payload;
    }
  },
})

export const getActiveCategory = (state: { catalog: CatalogState }) => state.catalog.activeCategory;
export const getPriceRange = (state: { catalog: CatalogState }) => state.catalog.priceRange;

export const { setActiveCategory, setPriceRange } = catalogSlice.actions

export default catalogSlice.reducer