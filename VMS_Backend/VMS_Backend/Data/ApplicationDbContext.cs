using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data.DatabaseModels;

namespace VMS_Backend.Data
{
/* Migrations commands: from inner VMS_Backend folder
dotnet ef migrations add *name* -o Data/Migrations
dotnet ef database update
*/
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<CompanySettings> CompanySettings { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<VehicleData> VehicleData { get; set; }
        public DbSet<VehicleDriverLink> VehicleDriverLink { get; set; }
        public DbSet<WorkTask> WorkTask { get; set; }
        public DbSet<WorkTaskComment> WorkTaskComment { get; set; }
        public DbSet<WorkTaskStatus> WorkTaskStatus { get; set; }
        public DbSet<ChatMessage> ChatMessage { get; set; }
    }
}