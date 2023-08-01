using Core.Models;
using DatabaseProvider.Repositories.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace DatabaseProvider.Repositories.Implementations
{
    public class DeliveryRepository : Repository<Delivery>, IDeliveryRepository
    {
        public DeliveryRepository( ApplicationContext context )
            : base( context )
        {
        }
        public List<Delivery> GetAll()
        {
            return Entities.Include( d => d.Client ).Include( d => d.Courier ).ToList();
        }

        public List<Delivery> GetByClientId( int id )
        {
            return Entities.Include( d => d.Client ).Include( d => d.Courier ).Where( d => d.ClientId == id ).ToList();
        }

        public List<Delivery> GetByCourierId( int id )
        {
            return Entities.Include( d => d.Client ).Include( d => d.Courier ).Where( d => d.CourierId == id ).ToList();
        }

        public Delivery GetById( int id )
        {
            return Entities.Include( d => d.Client ).Include( d => d.Courier ).FirstOrDefault( d => d.DeliveryId == id );
        }
    }
}
