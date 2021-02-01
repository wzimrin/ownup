import * as React from 'react';
import { useSelector } from 'react-redux';

import {  selectQuotes } from './store';
import { Quote } from './quotes';

const dollarFormatter = Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
const percentFormatter = Intl.NumberFormat("en-US", {style: "decimal", maximumSignificantDigits: 4});

function QuoteRow(props: {quote: Quote}): JSX.Element {
    const style = {
        padding: "5px",
    }
    return (
        <tr>
            <td style={style}>{props.quote.lenderName}</td>
            <td style={style}>{props.quote.loanType}</td>
            <td style={style}>{percentFormatter.format(props.quote.interestRate)}%</td>
            <td style={style}>{dollarFormatter.format(props.quote.closingCosts)}</td>
            <td style={style}>{dollarFormatter.format(props.quote.monthlyPayment)}</td>
            <td style={style}>{percentFormatter.format(props.quote.apr)}%</td>
        </tr>
    );
}

function QuotesHeader(): JSX.Element {
    const style = {
        padding: "5px",
        borderBottom: "1px solid black",
    }
    return (
        <thead>
            <tr>
                <th style={style}>Lender</th>
                <th style={style}>Product</th>
                <th style={style}>Rate</th>
                <th style={style}>Closing Costs</th>
                <th style={style}>Monthly Payment</th>
                <th style={style}>APR</th>
            </tr>
        </thead>
    );
}

export function QuotesDisplay(): JSX.Element {
    const style = {
        marginTop: "20px",
        borderSpacing: 0,
    } as const;

    const quotes = useSelector(selectQuotes);
    console.log("quotesDisplay", quotes);
    if (quotes.length == 0) {
        return (
            <div style={style}> No Quotes </div>
        );
    }
    const rows = quotes.map((quote, idx) => {
        return <QuoteRow quote={quote} key={idx} />
    });
    console.log(rows);
    return (
        <table style={style}>
            <QuotesHeader />
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
