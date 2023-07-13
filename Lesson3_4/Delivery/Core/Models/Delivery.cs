namespace Core.Models
{
    public class Delivery
    {
        public int DeliveryId { get; set; }
        public string Composition { get; set; }
        public int ClientId { get; set; }
        public int CourierId { get; set; }
        public Client Client { get; set; }
        public Courier Courier { get; set; }

        public override string ToString()
        {
            return $"{DeliveryId}. Client: {Client.ClientId} - {Client.Name}. Composition: {Composition}. Courier: {Courier.Name}";
        }
    }
}
