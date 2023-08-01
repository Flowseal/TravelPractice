using Core.Models;

namespace Delivery
{
    public partial class Program
    {
        public static void DeliveriesManagement()
        {
            while ( true )
            {
                Console.WriteLine( "1. List all deliveries" );
                Console.WriteLine( "2. List all deliveries by courier ID" );
                Console.WriteLine( "3. List all deliveries by client ID" );
                Console.WriteLine( "4. Get delivery by ID" );
                Console.WriteLine( "5. New delivery" );
                Console.WriteLine( "6. Delete delivery" );
                Console.WriteLine( "7. Back" );
                Console.Write( "Enter command number: " );
                string rawCommandNumber = Console.ReadLine();

                if ( int.TryParse( rawCommandNumber, out int commandNumber ) )
                {
                    switch ( commandNumber )
                    {
                        case 1:
                            ListAllDeliveries();
                            break;
                        case 2:
                            ListAllDeliveriesByCourierId();
                            break;
                        case 3:
                            ListAllDeliveriesByClientId();
                            break;
                        case 4:
                            GetDeliveryById();
                            break;
                        case 5:
                            NewDelivery();
                            break;
                        case 6:
                            DeleteDelivery();
                            break;
                        case 7:
                            return;
                    }
                }

                Console.WriteLine();
            }
        }

        public static void ListAllDeliveries()
        {
            foreach ( var delivery in _deliveryRepository.GetAll() )
            {
                Console.WriteLine( delivery );
            }
        }

        public static void ListAllDeliveriesByCourierId()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int courierId ) )
            {
                foreach ( var delivery in _deliveryRepository.GetByCourierId( courierId ) )
                {
                    Console.WriteLine( delivery );
                }
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }

        public static void ListAllDeliveriesByClientId()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int clientId ) )
            {
                foreach ( var delivery in _deliveryRepository.GetByClientId( clientId ) )
                {
                    Console.WriteLine( delivery );
                }
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }

        public static void GetDeliveryById()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int deliveryId ) )
            {
                Console.WriteLine( _deliveryRepository.GetById( deliveryId ) );
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }

        public static void NewDelivery()
        {
            int ClientId = 0;
            int CourierId = 0;
            string Composition = string.Empty;

            while ( ClientId <= 0 )
            {
                Console.Write( "Client ID: " );
                string rawClientId = Console.ReadLine();
                int.TryParse( rawClientId, out ClientId );
            }
            while ( CourierId <= 0 )
            {
                Console.Write( "Courier ID: " );
                string rawCourierId = Console.ReadLine();
                int.TryParse( rawCourierId, out CourierId );
            }
            while ( Composition == string.Empty )
            {
                Console.Write( "Composition: " );
                Composition = Console.ReadLine();
            }

            Core.Models.Delivery delivery = new Core.Models.Delivery
            {
                Composition = Composition,
                ClientId = ClientId,
                CourierId = CourierId
            };

            _deliveryRepository.Add( delivery );
            _deliveryRepository.SaveChanges();
        }

        public static void DeleteDelivery()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int deliveryId ) )
            {
                Core.Models.Delivery delivery = _deliveryRepository.GetById( deliveryId );
                _deliveryRepository.Remove( delivery );
                _deliveryRepository.SaveChanges();
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }
    }
}
