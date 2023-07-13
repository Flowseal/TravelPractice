using Core.Models;

namespace DatabaseProvider.Repositories.Abstractions
{
    public interface IClientRepository : IRepository<Client>
    {
        public List<Client> GetAll();
        public Client GetById( int id );
    }
}
