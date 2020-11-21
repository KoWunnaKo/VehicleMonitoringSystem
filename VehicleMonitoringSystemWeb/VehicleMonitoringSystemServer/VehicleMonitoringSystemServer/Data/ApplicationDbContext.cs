using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VehicleMonitoringSystemServer.Data.Models;

namespace VehicleMonitoringSystemServer.Data
{
/* Migrations commands: from VehicleMonitoringSystemServer folder
dotnet ef migrations add *name* -o Data/Migrations
dotnet ef database update
*/
    public class ApplicationDbContext : ApiAuthorizationDbContext<AppUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            
        }
        
        public DbSet<WorkTaskStatus> WorkTaskStatus { get; set; }
        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<VehicleData> VehicleData { get; set; }
        public DbSet<WorkTask> WorkTask { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}