import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchQuotes, selectQuotes } from './store';
import { LoanSizeInput, CreditScoreInput, PropertyTypeInput,
         OccupancyInput, ErrorDisplay } from './inputs'
import { QuotesDisplay } from './quoteDisplay'

export function App(): JSX.Element {
    const quotes = useSelector(selectQuotes);
    const dispatch = useDispatch();
    return (
        <div>
            <LoanSizeInput />
            <CreditScoreInput />
            <PropertyTypeInput />
            <OccupancyInput />
            <button onClick={() => dispatch(fetchQuotes()) }>
                Quote Rates
            </button>
            <ErrorDisplay />
            <QuotesDisplay />
        </div>
    );
}

