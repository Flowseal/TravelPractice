using Core.Models;
using DatabaseProvider.Repositories.Abstractions;

namespace DatabaseProvider.Repositories.Implementations
{
    public class CourierRepository : Repository<Courier>, ICourierRepository
    {
        public CourierRepository( ApplicationContext context )
            : base( context )
        {
        }
        public List<Courier> GetAll()
        {
            return Entities.ToList();
        }

        public Courier GetById( int id )
        {
            return Entities.Where( c => c.CourierId == id ).FirstOrDefault();
        }
    }
}
