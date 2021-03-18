using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleService : BaseDatabaseService<Vehicle>
    {
        public VehicleService(ApplicationDbContext dbContext) : base(dbContext) { }
        
        public async Task<List<Vehicle>> GetAll(int companyId)
        {
            var vehicles = await _dbContext.Vehicle
                .Where(v => v.CompanyId.Equals(companyId))
                .ToListAsync();
            return vehicles;
        }

        public async Task<Vehicle> Edit(Vehicle vehicle)
        {
            var dbVehicle = await _dbContext.FindAsync<Vehicle>(vehicle.Id);
            if (dbVehicle == null)
            {
                return null;
            }
            
            dbVehicle.Name = vehicle.Name;
            dbVehicle.Number = vehicle.Number;
            dbVehicle.Model = vehicle.Model;
            dbVehicle.ProductionYear = vehicle.ProductionYear;
            await _dbContext.SaveChangesAsync();
            return dbVehicle;
        }
    }
}