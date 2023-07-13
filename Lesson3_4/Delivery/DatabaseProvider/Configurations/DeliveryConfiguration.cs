using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations
{
    public class DeliveryConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure( EntityTypeBuilder<Delivery> builder )
        {
            builder.ToTable( "Delivery" ).HasKey( d => d.DeliveryId );
            builder.HasOne( d => d.Client ).WithMany( c => c.Deliveries ).OnDelete( DeleteBehavior.Cascade );
            builder.HasOne( d => d.Courier ).WithMany( c => c.Deliveries ).OnDelete( DeleteBehavior.Cascade );
        }
    }
}
