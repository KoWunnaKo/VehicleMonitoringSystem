using GeodataProcessingService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace GeodataProcessingService
{
    public class AppDbContext : DbContext
    {
        public DbSet<VehicleDataRequest> VehicleData { get; set; }
        
        private IConfiguration Configuration { get; }
        
        public AppDbContext(IConfiguration configuration)
        {
            Database.EnsureCreated();
            Configuration = configuration;
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        {
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }
    }
}