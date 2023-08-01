using Core.Models;
using System.Diagnostics.Metrics;

namespace Delivery
{
    public partial class Program
    {
        public static void CouriersManagement()
        {
            while ( true )
            {
                Console.WriteLine( "1. List all couriers" );
                Console.WriteLine( "2. Get courier by ID" );
                Console.WriteLine( "3. New courier" );
                Console.WriteLine( "4. Delete courier" );
                Console.WriteLine( "5. Back" );
                Console.Write( "Enter command number: " );
                string rawCommandNumber = Console.ReadLine();

                if ( int.TryParse( rawCommandNumber, out int commandNumber ) )
                {
                    switch ( commandNumber )
                    {
                        case 1:
                            ListAllCouriers();
                            break;
                        case 2:
                            GetCourierById();
                            break;
                        case 3:
                            NewCourier();
                            break;
                        case 4:
                            DeleteCourier();
                            break;
                        case 5:
                            return;
                    }
                }

                Console.WriteLine();
            }
        }

        public static void ListAllCouriers()
        {
            foreach ( var courier in _courierRepository.GetAll() )
            {
                Console.WriteLine( courier );
            }
        }

        public static void GetCourierById()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int courierId ) )
            {
                Console.WriteLine( _courierRepository.GetById( courierId ) );
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }

        public static void NewCourier()
        {
            string Name = string.Empty;
            string Phone = string.Empty;

            while ( Name == string.Empty )
            {
                Console.Write( "Name: " );
                Name = Console.ReadLine();
            }
            while ( Phone == string.Empty )
            {
                Console.Write( "Phone: " );
                Phone = Console.ReadLine();
            }

            Courier courier = new Courier
            {
                Name = Name,
                Phone = Phone
            };

            _courierRepository.Add( courier );
            _courierRepository.SaveChanges();
        }

        public static void DeleteCourier()
        {
            Console.Write( "ID: " );
            string rawId = Console.ReadLine();

            if ( int.TryParse( rawId, out int courierId ) )
            {
                Courier courier = _courierRepository.GetById( courierId );
                _courierRepository.Remove( courier );
                _courierRepository.SaveChanges();
            }
            else
            {
                Console.WriteLine( "Entered value not a number" );
            }
        }
    }
}
