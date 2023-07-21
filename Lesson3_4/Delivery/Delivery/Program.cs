using DatabaseProvider;
using DatabaseProvider.Repositories.Abstractions;
using DatabaseProvider.Repositories.Implementations;
using System.Data;

namespace Delivery
{
    public partial class Program
    {
        private const string ConnectionString =
            "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Delivery;Pooling=true;Integrated Security=SSPI";

        private static ApplicationContext _applicationContext;
        private static IClientRepository _clientRepository;
        private static ICourierRepository _courierRepository;
        private static IDeliveryRepository _deliveryRepository;

        public static void Main( string[] args )
        {
            _applicationContext = new ApplicationContext( ConnectionString );
            _clientRepository = new ClientRepository( _applicationContext );
            _courierRepository = new CourierRepository( _applicationContext );
            _deliveryRepository = new DeliveryRepository( _applicationContext );

            ProcessCommands();
        }

        public static void ProcessCommands()
        {
            while ( true )
            {
                Console.Clear();
                Console.WriteLine( "1. Clients management" );
                Console.WriteLine( "2. Couriers management" );
                Console.WriteLine( "3. Deliveries management" );
                Console.WriteLine( "4. Exit" );
                Console.Write( "Enter command number: " );
                string rawCommandNumber = Console.ReadLine();

                if ( int.TryParse( rawCommandNumber, out int commandNumber ) )
                {
                    Console.Clear();

                    switch ( commandNumber )
                    {
                        case 1:
                            ClientsManagement();
                            break;
                        case 2:
                            CouriersManagement();
                            break;
                        case 3:
                            DeliveriesManagement();
                            break;
                        case 4:
                            return;
                    }
                }
            }
        }
    }
}