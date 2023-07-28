import "./ConvertationForm.css";
import { useRef } from "react";
import { Currency } from "../../types/Currency";
import { findCurrencyByCode, roundMoney } from "../../UtilityFunctions";

type ConvertationFormProps = {
    currencies: Currency[];
    price: number;
    paymentAmount: string;
    paymentCurrency: string;
    purchasedCurrency: string;
    onCurrencyChange: (paymentCurrency: string, purchasedCurrency: string, swapped: boolean) => void;
    onPaymentAmountChange: (paymentAmount: string) => void;
};

const formGroup = (formName: string, inputValue: string, selectValue: string, 
  ref: React.RefObject<HTMLSelectElement>,
  currencies: Currency[],
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void): JSX.Element => {

  return (
    <div className="currencies__form">
      <input 
        className={"form__currency-amount"}
        type="number" 
        min="0" 
        name={formName + "-amount"} 
        value={inputValue}
        onChange={onInputChange} 
      />
      <div className="form__divider" />
      <select 
        ref={ref}
        className="form__currency-type" 
        name={formName + "-type"} 
        value={selectValue}
        onChange={onSelectChange}>
          {currencies.map((currency, j) => (
            <option key={j} value={currency.code}>{currency.name}</option>
          ))}
      </select>
    </div>
  )
};

export default function ConvertationForm({currencies, price, paymentAmount, paymentCurrency, purchasedCurrency, onCurrencyChange, onPaymentAmountChange}: ConvertationFormProps) {
    const paymentCurrencyRef = useRef<HTMLSelectElement>(null);
    const purchasedCurrencyRef = useRef<HTMLSelectElement>(null);
    const purchasedAmount = roundMoney(String(1 / price * Number(paymentAmount)));

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value) >= 0 ? Number(event.target.value) : 0;
      if (event.target.name === "payment-currency-amount")
      {
        onPaymentAmountChange(String(value));
      }
      else
      {
        onPaymentAmountChange(String(price * value));
      }
    };

    const handlePaymentCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const otherCurrency = purchasedCurrencyRef.current!.value;
      let currenciesSwapped = false;

      // Swap currencies if new currency value is the same as the other currency
      if (event.target.value === otherCurrency)
      {
        currenciesSwapped = true;
        purchasedCurrency = paymentCurrency;
      }
      
      paymentCurrency = event.target.value;
      onCurrencyChange!(paymentCurrency, purchasedCurrency, currenciesSwapped);
    };

    const handlePurchasedCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const otherCurrency = paymentCurrencyRef.current!.value;
      let currenciesSwapped = false;

      // Swap currencies if new currency value is the same as the other currency
      if (event.target.value === otherCurrency)
      {
        currenciesSwapped = true;
        paymentCurrency = purchasedCurrency;
      }
      
      purchasedCurrency = event.target.value;
      onCurrencyChange!(paymentCurrency, purchasedCurrency, currenciesSwapped);
    };

    return (
      <div className="converter__currencies">      
        <span className="currencies__payment">{paymentAmount} {findCurrencyByCode(currencies, paymentCurrency)!.name} equals</span>
        <p className="currencies__purchased">{purchasedAmount} {findCurrencyByCode(currencies, purchasedCurrency)!.name}</p>

        {formGroup("payment-currency", paymentAmount, paymentCurrency, paymentCurrencyRef, currencies, handleAmountChange, handlePaymentCurrencyChange)}
        {formGroup("purchased-currency", purchasedAmount, purchasedCurrency, purchasedCurrencyRef, currencies, handleAmountChange, handlePurchasedCurrencyChange)}
      </div>
    );
}