using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions
{
    public interface ICourierRepository : IRepository<Courier>
    {
        public List<Courier> GetAll();
        public Courier GetById( int id );
    }
}
