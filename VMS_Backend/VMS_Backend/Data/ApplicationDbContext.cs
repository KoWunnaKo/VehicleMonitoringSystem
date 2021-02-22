﻿using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data.Models;

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
        
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<CompanySettings> CompanySettings { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<VehicleData> VehicleData { get; set; }
        public DbSet<VehicleDriverLink> VehicleDriverLink { get; set; }
        public DbSet<WorkTask> WorkTask { get; set; }
        public DbSet<WorkTaskStatus> WorkTaskStatus { get; set; }
    }
}