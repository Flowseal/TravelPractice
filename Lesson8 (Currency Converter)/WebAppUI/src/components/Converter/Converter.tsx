import "./Converter.css";
import { Currency } from "../../types/Currency";
import { CurrencyPrice } from "../../types/CurrencyPrice";
import { findCurrencyByCode } from "../../UtilityFunctions";
import ConvertationForm from "../ConvertationForm/ConverationForm";
import Graph from "../Graph/Graph";

type ConverterProps = {
  currencies: Currency[];
  price: number;
  paymentAmount: string;
  paymentCurrency: string;
  purchasedCurrency: string;
  pricesHistory: CurrencyPrice[];
  onCurrencyChange: (paymentCurrency: string, purchasedCurrency: string, swapped: boolean) => void;
  onPaymentAmountChange: (paymentAmount: string) => void;
};

export default function Converter({ currencies, price, paymentAmount, paymentCurrency, purchasedCurrency, pricesHistory, onCurrencyChange, onPaymentAmountChange }: ConverterProps) {  
  return (
    <div className="converter-block">
      <div className="converter">
        <ConvertationForm
          currencies={currencies}
          price={price}
          paymentAmount={paymentAmount}
          paymentCurrency={paymentCurrency}
          purchasedCurrency={purchasedCurrency}
          onCurrencyChange={onCurrencyChange}
          onPaymentAmountChange={onPaymentAmountChange}
        />
        <Graph
          currencyPair={`${paymentCurrency}/${purchasedCurrency}`}
          pricesHistory={pricesHistory}
        />
      </div>
      
      <div className="converter-footer">
        <div className="tooltip">More about {paymentCurrency}/{purchasedCurrency}
          <p className="tooltiptext">
            {findCurrencyByCode(currencies, paymentCurrency)!.description}
            {findCurrencyByCode(currencies, purchasedCurrency)!.description}
          </p>
        </div>
      </div>
    </div>
  );
}