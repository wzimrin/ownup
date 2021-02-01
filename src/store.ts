import { createSlice, PayloadAction, configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {getQuotes, Quote, PropertyType, Occupancy} from './quotes';

export type State = {
    loanSize: string,
    creditScore: string,
    propertyType: PropertyType | "",
    occupancy: Occupancy | "",
    quotes: Quote[],
    error: string | null,
}

const slice = createSlice({
    name: 'main',
    initialState: {
        loanSize: "",
        creditScore: "",
        propertyType: "",
        occupancy: "",
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
        updatePropertyType: (state: State, action: PayloadAction<PropertyType | "">) => {
            state.propertyType = action.payload;
        },
        updateOccupancy: (state: State, action: PayloadAction<Occupancy | "">) => {
            state.occupancy = action.payload;
        },
        updateQuotes: (state: State, action: PayloadAction<Quote[]>) => {
            state.quotes = action.payload;
        },
        updateError: (state: State, action: PayloadAction<string | null>) => {
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
        if (loanSize <= 0) {
            dispatch(updateError("Please enter a positive number for loan size"));
            return;
        }
        const creditScore = Number(state.creditScore);
        if (creditScore < 300 || creditScore > 800) {
            dispatch(updateError("Please enter a number between 300 and 800 for credit score"));
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
        dispatch(updateError(null));
        const quotes = await getQuotes(loanSize, creditScore, state.propertyType, state.occupancy);
        dispatch(updateQuotes(quotes));
    }
}

export const store = configureStore({
    reducer: slice.reducer
});

export type AppDispatch = typeof store.dispatch;

export const selectLoanSize = (state: State) => state.loanSize;
export const selectCreditScore = (state: State) => state.creditScore;
export const selectPropertyType = (state: State) => state.propertyType;
export const selectOccupancy = (state: State) => state.occupancy;
export const selectQuotes = (state: State) => state.quotes;
export const selectError = (state: State) => state.error;
