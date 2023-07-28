import { Currency } from "../types/Currency";

export default function fetchCurrencies(): Promise<Currency[]> {
    return fetch("https://localhost:7120/Currencies")
      .then((res) => res.json())
      .then((data) => {
        return data;
      }) as Promise<Currency[]>;
};
