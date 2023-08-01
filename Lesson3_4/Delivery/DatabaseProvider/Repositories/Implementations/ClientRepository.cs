using Core.Models;
using DatabaseProvider.Repositories.Abstractions;

namespace DatabaseProvider.Repositories.Implementations
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        public ClientRepository( ApplicationContext context )
            : base( context )
        {
        }
        public List<Client> GetAll()
        {
            return Entities.ToList();
        }

        public Client GetById( int id )
        {
            return Entities.FirstOrDefault( c => c.ClientId == id );
        }
    }
}
