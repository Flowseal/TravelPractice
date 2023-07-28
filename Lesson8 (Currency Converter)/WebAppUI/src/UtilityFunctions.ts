import { Currency } from "./types/Currency";

export function findCurrencyByCode(currencies: Currency[], code: string): Currency | null {
    for (const currency of currencies)
    {
        if (currency.code == code)
        {
            return currency;
        }
    }
    
    return null;
};

export function roundMoney(amount: string): string {
    if (!amount.includes("."))
    {
        return amount;
    }

    const integerPart = amount.split(".")[0];
    const fractionalPart = amount.split(".")[1];

    let newFractionalPart: string = "";
    let nonZeroDigits: number = 0;
    for (let i = 0; i < fractionalPart.length; i++)
    {
        if (nonZeroDigits === 0 && fractionalPart[i] === "0")
        {
            newFractionalPart += "0";
            continue;
        }

        newFractionalPart += fractionalPart[i];
        nonZeroDigits += 1;

        if (nonZeroDigits === 2)
        {
            break;
        }
    }

    return `${integerPart}.${newFractionalPart}`;
};