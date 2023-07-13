using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure( EntityTypeBuilder<Client> builder )
        {
            builder.ToTable( "Client" ).HasKey( c => c.ClientId );
            builder.Property( c => c.Name ).IsRequired().HasMaxLength( 50 ).HasColumnName( "Name" );
            builder.Property( c => c.Address ).IsRequired().HasMaxLength( 50 ).HasColumnName( "Address" );
            builder.Property( c => c.Phone ).IsRequired().HasMaxLength( 50 ).HasColumnName( "Phone" );
        }
    }
}
