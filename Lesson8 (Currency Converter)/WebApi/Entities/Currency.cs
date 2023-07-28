using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    public class Currency
    {
        public string Code { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        
        public string Symbol { get; set; } = string.Empty;

        [JsonIgnore]
        public decimal MinPrice { get; set; }

        [JsonIgnore]
        public decimal MaxPrice { get; set; }

        //[JsonIgnore]
        //public ICollection<CurrencyPrice> Prices { get; set; } = new List<CurrencyPrice>();
    }
}
