import {apiKey} from './apiKey';
import type {Quote, PropertyType, Occupancy} from './store';

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
