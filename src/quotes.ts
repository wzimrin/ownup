import {apiKey} from './apiKey';

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

const baseUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes"

export async function getQuotes(
    loanSize: number,
    creditScore: number,
    propertyType: PropertyType,
    occupancy: Occupancy
): Promise<Quote[]> {
    const url = `${baseUrl}?loanSize=${loanSize}&creditScore=${creditScore}&propertyType=${propertyType}&occupancy=${occupancy}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `OU-AUTH ${apiKey}`,
        },
    });
    const json = await response.json();
    return json.rateQuotes;
}
