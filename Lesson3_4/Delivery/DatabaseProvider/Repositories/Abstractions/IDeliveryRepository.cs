using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions
{
    public interface IDeliveryRepository : IRepository<Delivery>
    {
        public List<Delivery> GetAll();
        public Delivery GetById( int id );
        public List<Delivery> GetByClientId( int id );
        public List<Delivery> GetByCourierId( int id );
    }
}
