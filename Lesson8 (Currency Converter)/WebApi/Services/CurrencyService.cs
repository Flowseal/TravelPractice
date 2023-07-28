using System.Collections.Generic;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Currencies;
using WebApi.Models.Currency;

namespace WebApi.Services
{
    public interface ICurrencyService
    {
        IEnumerable<Currency> GetAll();
        Currency GetByCode(string code);
        IEnumerable<PriceChange> GetPriceChanges(GetPricesRequest model);
    }

    public class CurrencyService : ICurrencyService
    {
        private DataContext _context;

        public CurrencyService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Currency> GetAll()
        {
            return _context.Currencies;
        }

        public Currency GetByCode(string code)
        {
            var user = _context.Currencies.Find(code);
            if (user == null) throw new KeyNotFoundException("Currency not found");
            return user;
        }

        public IEnumerable<PriceChange> GetPriceChanges(GetPricesRequest model)
        {
            var purchasedCurrency = model.PurchasedCurrency;
            var paymentCurrency = model.PaymentCurrency;
            var currencyCodes = _context.Currencies.Select(c => c.Code);
            if (!currencyCodes.Contains(purchasedCurrency))
            {
                throw new AppException($"Unknown currency {purchasedCurrency}");
            } else if (!currencyCodes.Contains(paymentCurrency))
            {
                throw new AppException($"Unknown currency {paymentCurrency}");
            }

            var result = _context.CurrencyPrices
                .Where(c => (c.CurrencyCode == purchasedCurrency || c.CurrencyCode == paymentCurrency) &&
                    c.DateTime >= model.FromDateTime &&
                    (model.ToDateTime == null || c.DateTime <= model.ToDateTime))
                .OrderBy(c => c.DateTime)
                .ToList()
                .GroupBy(c => c.DateTime)
                .Select((IGrouping<DateTime, CurrencyPrice> g) =>
                {
                    var purchased = g.FirstOrDefault(item => item.CurrencyCode == purchasedCurrency);
                    var payment = g.FirstOrDefault(item => item.CurrencyCode == paymentCurrency);

                    if (purchased == null || payment == null)
                    {
                        throw new AppException($"Grouping should contain both currencies, there are no currencies payment = {payment}, purchased = {purchased} for date {g.Key}");
                    }

                    return new PriceChange
                    {
                        DateTime = g.Key,
                        PaymentCurrencyCode = payment.CurrencyCode,
                        PurchasedCurrencyCode = purchased.CurrencyCode,
                        Price = decimal.Round(purchased.Price / payment.Price, 3, MidpointRounding.ToPositiveInfinity)
                    };
                });

            return result;
        }

        private CurrencyPrice? GetLastPriceChangeBeforeDate(DateTime date, string currencyCode) 
        {
            return _context.CurrencyPrices.Where(c => c.CurrencyCode == currencyCode && c.DateTime <= date).OrderBy(c => c.DateTime).LastOrDefault();
        }
    }
}
