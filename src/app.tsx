import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchQuotes, selectQuotes } from './store';

export function App(): JSX.Element {
    const quotes = useSelector(selectQuotes);
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => dispatch(fetchQuotes()) }>
                Fetch Quotes!
            </button>
            <div>
                {JSON.stringify(quotes)}
            </div>
        </div>
    );
}

