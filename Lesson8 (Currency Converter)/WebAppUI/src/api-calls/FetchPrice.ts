import { CurrencyPrice } from "../types/CurrencyPrice";

export default function fetchPrice(payment: string, purchased: string, minutesDifference: number): Promise<Record<string, CurrencyPrice[]>> {
    const fromDateTime = new Date();
    fromDateTime.setMinutes(fromDateTime.getMinutes() - minutesDifference );

    return fetch(`https://localhost:7120/prices?${new URLSearchParams({
      // API expects DateTimes in UTC timezone
      FromDateTime: fromDateTime.toISOString(),
      PaymentCurrency: payment,
      PurchasedCurrency: purchased,
    })}`)
      .then((res) => res.json())
      .then((data) => {
        const currencyPairPrices: CurrencyPrice[] = [];
        const currencyPairPricesInverse: CurrencyPrice[] = [];

        for (const priceIndex in data)
        {
          currencyPairPrices.push({
            dateTime: new Date(data[priceIndex]["dateTime"]), 
            price: Number(data[priceIndex]["price"])
          });

          currencyPairPricesInverse.push({
            dateTime: new Date(data[priceIndex]["dateTime"]), 
            price: 1 / Number(data[priceIndex]["price"])
          });
        }

        return {[`${payment}/${purchased}`]: currencyPairPrices, [`${purchased}/${payment}`]: currencyPairPricesInverse};
    }) as Promise<Record<string, CurrencyPrice[]>>;
};