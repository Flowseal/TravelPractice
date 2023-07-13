using DatabaseProvider.Configurations;
using Microsoft.EntityFrameworkCore;

namespace DatabaseProvider
{
    public class ApplicationContext : DbContext
    {
        private readonly string _connectionString;

        public ApplicationContext( DbContextOptions<ApplicationContext> options )
            : base( options )
        {
        }

        public ApplicationContext( string connectionString )
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
        {
            if ( _connectionString == null )
            {
                return;
            }
            optionsBuilder.UseSqlServer( _connectionString );
        }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.ApplyConfiguration( new ClientConfiguration() );
            modelBuilder.ApplyConfiguration( new CourierConfiguration() );
            modelBuilder.ApplyConfiguration( new DeliveryConfiguration() );
        }
    }
}
