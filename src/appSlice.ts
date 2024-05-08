import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HOMEPAGE } from './utils/constants'

export interface AppState {
    currentFooterSection: string
}

const initialState: AppState = {
    currentFooterSection: HOMEPAGE,
}

export const counterSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentFooterSection: (state, action: PayloadAction<string>) => {
            state.currentFooterSection = action.payload
        },
    },
})



// Action creators are generated for each case reducer function
export const { setCurrentFooterSection } = counterSlice.actions

export default counterSlice.reducer