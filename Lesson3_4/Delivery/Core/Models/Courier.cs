namespace Core.Models
{
    public class Courier
    {
        public int CourierId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public List<Delivery> Deliveries { get; set; }

        public override string ToString()
        {
            return $"{CourierId}. {Name}, {Phone}";
        }
    }
}
