using Microsoft.EntityFrameworkCore;

namespace BookShopMigrations
{
    public class Program
    {
        static void Main( string[] args )
        {
            new ContextFactory().CreateDbContext( args ).Database.Migrate();
        }
    }
}