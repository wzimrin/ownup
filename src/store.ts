import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'

export type Quote = {
    lenderName: string,
    loanType: string,
    interestRate: number,
    closingCosts: number,
    monthlyPayment: number,
    apr: number,
};

export type PropertyType = "SingleFamily" | "Condo" | "Townhouse" | "MultiFamily";
export type Occupancy = "Primary" | "Secondary" | "Investment";

export type State = {
    loanSize: string,
    creditScore: string,
    propertyType?: PropertyType,
    occupancy?: Occupancy,
    quotes: Quote[],
}

const slice = createSlice({
    name: 'main',
    initialState: {
        loanSize: "",
        creditScore: "",
        quotes: [],
    } as State,
    reducers: {
        updateLoanSize: (state: State, action: PayloadAction<string>) => {
            state.loanSize = action.payload;
        },
        updateCreditScore: (state: State, action: PayloadAction<string>) => {
            state.creditScore = action.payload;
        },
        updatePropertyType: (state: State, action: PayloadAction<PropertyType | undefined>) => {
            state.propertyType = action.payload;
        },
        updateOccupancy: (state: State, action: PayloadAction<Occupancy | undefined>) => {
            state.occupancy = action.payload;
        },
        updateQuotes: (state: State, action: PayloadAction<Quote[]>) => {
            state.quotes = action.payload;
        },
    }
})

export const {
    updateLoanSize,
    updateCreditScore,
    updatePropertyType,
    updateOccupancy,
    updateQuotes
} = slice.actions;

export const store = configureStore({
    reducer: slice.reducer
});

export type AppDispatch = typeof store.dispatch;
