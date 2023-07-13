namespace Core.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public List<Delivery> Deliveries { get; set; }

        public override string ToString()
        {
            return $"{ClientId}. {Name}, {Address}, {Phone}";
        }
    }
}
