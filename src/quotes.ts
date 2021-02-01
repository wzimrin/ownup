import {apiKey} from './apikey';

export type propertyType = "SingleFamily" | "Condo" | "Townhouse" | "MultiFamily";
export type occupancy = "Primary" | "Secondary" | "Investment";
export type quote = {
    lenderName: string,
    loanType: string,
    interestRate: number,
    closingCosts: number,
    monthlyPayment: number,
    apr: number,
};

const baseUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes"

export async function getQuotes(loanSize: number, creditScore: number, propertyType: propertyType, occupancy: occupancy): Promise<quote[]> {
    const url = `${baseUrl}?loanSize=${loanSize}&creditScore=${creditScore}&propertyType=${propertyType}&occupancy=${occupancy}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `OU-AUTH ${apiKey}`,
        },
    });
    const json = await response.json();
    return json.rateQuotes;
}
