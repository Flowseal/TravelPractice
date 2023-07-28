using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Currency
{
    public class GetPricesRequest
    {
        [Required]
        public string PaymentCurrency { get; set; } = string.Empty;

        [Required]
        public string PurchasedCurrency { get; set; } = string.Empty;

        [Required]
        public DateTime FromDateTime { get; set; }

        public DateTime? ToDateTime { get; set; }
    }
}
