import { CurrencyPrice } from "../types/CurrencyPrice";

type PriceDto = {
  dateTime: string;
  paymentCurrencyCode: string;
  price: number;
  purchasedCurrencyCode: string;
};

export default function fetchPrice(payment: string, purchased: string, minutesDifference: number): Promise<Record<string, CurrencyPrice[]>> {
    const fromDateTime = new Date();
    fromDateTime.setMinutes(fromDateTime.getMinutes() - minutesDifference );

    return fetch(`https://localhost:7120/prices?${new URLSearchParams({
      FromDateTime: fromDateTime.toISOString(),
      PaymentCurrency: payment,
      PurchasedCurrency: purchased,
    })}`)
      .then((res) => res.json())
      .then((data: PriceDto[]) => { 
        const prices: CurrencyPrice[] = data.map((priceData) => ({
          dateTime: new Date(priceData.dateTime),
          price: priceData.price
        }));

        return {
          [`${payment}/${purchased}`]: prices,
          [`${purchased}/${payment}`]: prices.map(price => ({ price: 1 / price.price, dateTime: price.dateTime })),
        };
    });
};