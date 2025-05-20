import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type CatalogItem  } from '../../interfaces/catalog-item'
import { remove } from 'lodash'

export interface WishListState {
  list: Array<CatalogItem>,
}

const initialState: WishListState = {
  list: [],
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<Array<CatalogItem>>) => {
      state.list = action.payload
    },
    addWishList: (state, action: PayloadAction<CatalogItem>) => {
      state.list.push(action.payload)
    },
    removeWishList: (state, action: PayloadAction<string>) => {
      state.list = remove(state.list, (item) => item.id !== action.payload)
    },
  },
})

export const getWishList = (state: { wishlist: WishListState }) => state.wishlist.list;

export const { setWishList, addWishList, removeWishList} = wishlistSlice.actions

export default wishlistSlice.reducer