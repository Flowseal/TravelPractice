import "./App.css";
import Converter from "./components/Converter/Converter";
import fetchCurrencies from "./api-calls/FetchCurrencies";
import fetchPrice from "./api-calls/FetchPrice";
import useInterval from "./hooks/UseInterval";
import { useEffect, useState } from "react";
import { Currency } from "./types/Currency"
import { CurrencyPrice } from "./types/CurrencyPrice";
import { roundMoney } from "./UtilityFunctions";

function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currencyPrices, setCurrencyPrices] = useState<Record<string, CurrencyPrice[]>>({});

  const [paymentAmount, setPaymentAmount] = useState<string>("0");
  const [paymentCurrency, setPaymentCurrency] = useState<string>("");
  const [purchasedCurrency, setPurhcasedCurrency] = useState<string>("");
  const [shouldFetchPrices, setShouldFetchPrices] = useState<boolean>(false);

  const currencyPair = `${paymentCurrency}/${purchasedCurrency}`;

  // Init currencies
  useEffect(() => {
    fetchCurrencies().then((data) => {
      setCurrencies(data);
      setPaymentCurrency(data[0]["code"]);
      setPurhcasedCurrency(data[1]["code"]);
      setShouldFetchPrices(true);
    });
  }, []);

  // Update prices for in-use currencies
  useInterval(() => {
    fetchCurrencies().then((data) => setCurrencies(data))
    .then(() => {
      const [paymentCurrency, purchasedCurrency] = currencyPair.split("/");
      const inversedCurrencyPair = `${purchasedCurrency}/${paymentCurrency}`;
      const updatedPrices: Record<string, CurrencyPrice[]> = {};
  
      fetchPrice(paymentCurrency, purchasedCurrency, 5).then((data) => {
        updatedPrices[currencyPair] = data[currencyPair];
        updatedPrices[inversedCurrencyPair] = data[inversedCurrencyPair];
      }).then(() => setCurrencyPrices(updatedPrices));
    });
  }, 10000);

  // Update price only if selected currencies changed
  useEffect(() => {
    if (shouldFetchPrices)
    {
      fetchPrice(paymentCurrency, purchasedCurrency, 5).then((data) => {
        setCurrencyPrices({...currencyPrices, ...data});
      });

      setShouldFetchPrices(false);
    }
  }, [shouldFetchPrices]);

  const onCurrencyChange = (newPaymentCurrency: string, newPurchasedCurrency: string, swapped: boolean) => {
    setPaymentCurrency(newPaymentCurrency);
    setPurhcasedCurrency(newPurchasedCurrency);
    setShouldFetchPrices(!swapped);
  };

  return (
    <>
      {currencies.length > 0 && currencyPrices[currencyPair] !== undefined && (
      <div className="converters">
        <Converter 
          currencies={currencies}
          price={currencyPrices[currencyPair][currencyPrices[currencyPair].length-1].price}
          paymentAmount={paymentAmount}
          paymentCurrency={paymentCurrency}
          purchasedCurrency={purchasedCurrency}
          pricesHistory={currencyPrices[currencyPair]}
          onCurrencyChange={onCurrencyChange}
          onPaymentAmountChange={(newPaymentAmount) => (setPaymentAmount(roundMoney(newPaymentAmount)))}
        />
      </div>
      )}
    </>
  );
}

export default App;