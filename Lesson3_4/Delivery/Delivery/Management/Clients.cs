using Core.Models;

namespace Delivery
{
    public partial class Program
    {
        public static void ClientsManagement()
        {
            while ( true )
            {
                Console.WriteLine( "1. List all clients" );
                Console.WriteLine( "2. Get client by ID" );
                Console.WriteLine( "3. New client" );
                Console.WriteLine( "4. Delete client" );
                Console.WriteLine( "5. Back" );
                Console.Write( "Enter command number: " );
                string rawCommandNumber = Console.ReadLine();

                if ( int.TryParse( rawCommandNumber, out int commandNumber ) )
                {
                    switch ( commandNumber )
                    {
                        case 1:
                            ListAllClients();
                            break;
                        case 2:
                            GetClientById();
                            break;
                        case 3:
                            NewClient();
                            break;
                        case 4:
                            DeleteClient();
                            break;
                        case 5:
                            return;
                    }
                }

                Console.WriteLine();
            }
        }

        public static void ListAllClients()
        {
            foreach ( var client in _clientRepository.GetAll() )
            {
                Console.WriteLine( client );
            }
        }
        public static void GetClientById()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int clientId ) )
            {
                Console.WriteLine( _clientRepository.GetById( clientId ) );
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }
        public static void NewClient()
        {
            string Name = string.Empty;
            string Address = string.Empty;
            string Phone = string.Empty;

            while ( Name == string.Empty )
            {
                Console.Write( "Name: " );
                Name = Console.ReadLine();
            }
            while ( Address == string.Empty )
            {
                Console.Write( "Address: " );
                Address = Console.ReadLine();
            }
            while ( Phone == string.Empty )
            {
                Console.Write( "Phone: " );
                Phone = Console.ReadLine();
            }

            Client client = new Client
            {
                Name = Name,
                Address = Address,
                Phone = Phone
            };

            _clientRepository.Add( client );
            _clientRepository.SaveChanges();
        }
        public static void DeleteClient()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int clientId ) )
            {
                Client client = _clientRepository.GetById( clientId );
                _clientRepository.Remove( client );
                _clientRepository.SaveChanges();
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }
    }
}
