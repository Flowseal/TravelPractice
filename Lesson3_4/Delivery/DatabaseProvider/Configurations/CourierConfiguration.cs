using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations
{
    public class CourierConfiguration : IEntityTypeConfiguration<Courier>
    {
        public void Configure( EntityTypeBuilder<Courier> builder )
        {
            builder.ToTable( "Courier" ).HasKey( c => c.CourierId );
            builder.Property( c => c.Name ).IsRequired().HasMaxLength( 50 ).HasColumnName( "Name" );
            builder.Property( c => c.Phone ).IsRequired().HasMaxLength( 50 ).HasColumnName( "Phone" );
        }
    }
}
