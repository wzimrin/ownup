import { createSlice, PayloadAction, configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {getQuotes, Quote, PropertyType, Occupancy} from './quotes';

export type State = {
    loanSize: string,
    creditScore: string,
    propertyType: PropertyType | null,
    occupancy: Occupancy | null,
    quotes: Quote[],
    error: string,
}

const slice = createSlice({
    name: 'main',
    initialState: {
        loanSize: "450000",
        creditScore: "750",
        propertyType: "SingleFamily",
        occupancy: "Primary",
        quotes: [],
        error: "",
    } as State,
    reducers: {
        updateLoanSize: (state: State, action: PayloadAction<string>) => {
            state.loanSize = action.payload;
        },
        updateCreditScore: (state: State, action: PayloadAction<string>) => {
            state.creditScore = action.payload;
        },
        updatePropertyType: (state: State, action: PayloadAction<PropertyType | null>) => {
            state.propertyType = action.payload;
        },
        updateOccupancy: (state: State, action: PayloadAction<Occupancy | null>) => {
            state.occupancy = action.payload;
        },
        updateQuotes: (state: State, action: PayloadAction<Quote[]>) => {
            state.quotes = action.payload;
        },
        updateError: (state: State, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    }
})

export const {
    updateLoanSize,
    updateCreditScore,
    updatePropertyType,
    updateOccupancy,
    updateQuotes,
    updateError,
} = slice.actions;

export const fetchQuotes = (): ThunkAction<void, State, void, Action> => {
    return async (dispatch: ThunkDispatch<State, void, Action>, getState: () => State) => {
        const state = getState();
        const loanSize = Number(state.loanSize);
        if (Number.isNaN(loanSize)) {
            dispatch(updateError("Please enter a number for loan size"));
            return;
        }
        const creditScore = Number(state.creditScore);
        if (Number.isNaN(creditScore)) {
            dispatch(updateError("Please enter a number for credit score"));
            return;
        }
        if (!state.propertyType) {
            dispatch(updateError("Please pick a property type"));
            return;
        }
        if (!state.occupancy) {
            dispatch(updateError("Please pick an occupancy type"));
            return;
        }
        const quotes = await getQuotes(loanSize, creditScore, state.propertyType, state.occupancy);
        dispatch(updateQuotes(quotes));
    }
}

export const store = configureStore({
    reducer: slice.reducer
});

export type AppDispatch = typeof store.dispatch;

export const selectQuotes = (state: State) => state.quotes;
