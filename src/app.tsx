import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

import { updateLoanSize, updateCreditScore, updatePropertyType, updateOccupancy,
         fetchQuotes, selectLoanSize, selectCreditScore, selectPropertyType, selectOccupancy,
         selectQuotes, selectError, State } from './store';

function InputLabel(props: {label: string}): JSX.Element {
    const style = {
        display: "inline-block",
        width: "120px",
        paddingRight: "5px",
        textAlign: "right",
    } as const;
    return (
        <div style={style}>{props.label}</div>
    );
}

function InputWrapper(props: {children: React.ReactChild[]}): JSX.Element {
    const style = {
        margin: "10px"
    } as const;
    return (
        <div style={style}>{props.children}</div>
    )
}

type NumberInputProps = {
    selector: (state: State) => string,
    action: ActionCreatorWithPayload<string, string>,
    label: string,
}

function NumberInput(props: NumberInputProps): JSX.Element {
    const value = useSelector(props.selector);
    const dispatch = useDispatch();
    return (
        <InputWrapper>
            <InputLabel label={props.label} />
            <input type="number"
                   onChange={e => dispatch(props.action(e.target.value))}
                   value={value} />
        </InputWrapper>
    );
}

function LoanSizeInput(): JSX.Element {
    return (
        <NumberInput selector={selectLoanSize} action={updateLoanSize} label="Loan Size" />
    );
}

function CreditScoreInput(): JSX.Element {
    return (
        <NumberInput selector={selectCreditScore} action={updateCreditScore} label="Credit Score" />
    );
}

type SelectInputProps<S extends string> = {
    selector: (state: State) => S | "",
    action: ActionCreatorWithPayload<S | "", string>,
    options: readonly (readonly [S, string])[],
    label: string,
};

function SelectInput<S extends string>(props: SelectInputProps<S>): JSX.Element {
    const value = useSelector(props.selector);
    const dispatch = useDispatch();
    const defaultOpt = (
        <option key="" value="">Select {props.label}</option>
    );
    const options = [defaultOpt].concat(props.options.map(([opt, name]) => {
        return (
            <option key={opt} value={opt}>{name}</option>
        );
    }));
    return (
        <InputWrapper>
            <InputLabel label={props.label} />
            <select value={value}
                    onChange={e => dispatch(props.action((e.target.value) as S | "")) }>
                {options}
            </select>
        </InputWrapper>
    );
}

function PropertyTypeInput(): JSX.Element {
    const options = [
        ["SingleFamily", "Single Family"],
        ["Condo", "Condo"],
        ["Townhouse", "Townhouse"],
        ["MultiFamily", "Multi Family"],
    ] as const;
    return (
        <SelectInput
            selector={selectPropertyType}
            action={updatePropertyType}
            options={options}
            label="Property Type" />
    )
}

function OccupancyInput(): JSX.Element {
    const options = [
        ["Primary", "Primary"],
        ["Secondary", "Secondary"],
        ["Investment", "Investment"],
    ] as const;
    return (
        <SelectInput
            selector={selectOccupancy}
            action={updateOccupancy}
            options={options}
            label="Occupancy" />
    )
}

function ErrorDisplay(): JSX.Element | null {
    const error = useSelector(selectError);
    if (!error) {
        return null;
    }
    const style = {
        color: "red",
    } as const;
    return (
        <div style={style}>{error}</div>
    );
}

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
                Fetch Quotes!
            </button>
            <ErrorDisplay />
            <div>
                {JSON.stringify(quotes)}
            </div>
        </div>
    );
}

