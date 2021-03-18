using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleDriverLinkService : BaseDatabaseService<VehicleDriverLink>
    {
        public VehicleDriverLinkService(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<VehicleDriverLink> AddNewItem(VehicleDriverLink item, DateTime now)
        {
            item.StartDate = now;
            item.EndDate = null;
            return await base.AddNewItem(item);
        }
        
        public async Task<VehicleDriverLink> GetCurrentDriverLink(int vehicleId)
        {
            var vehicleDriverLink = await _dbContext.VehicleDriverLink
                .Where(vdl => vdl.VehicleId == vehicleId && vdl.EndDate == null)
                .OrderByDescending(vdl => vdl.StartDate)
                .FirstOrDefaultAsync();
            return vehicleDriverLink;
        }
        
        public async Task<Employee> GetCurrentDriver(int vehicleId)
        {
            var vehicleDriverLinkList = _dbContext.VehicleDriverLink
                .Where(vdl => vdl.VehicleId == vehicleId && vdl.EndDate == null)
                .OrderByDescending(vdl => vdl.StartDate).ToList();
            VehicleDriverLink vehicleDriverLink;
            if (vehicleDriverLinkList.Any())
            {
                vehicleDriverLink = vehicleDriverLinkList.First();
            }
            else
            {
                return null;
            }
            
            var driver = await _dbContext.Employee
                .FirstOrDefaultAsync(e => e.Id == vehicleDriverLink.DriverId);
            return driver;
        }
        
        public async Task<VehicleDriverLink> Edit(VehicleDriverLink vehicleDriverLink)
        {
            var dbVehicleDriverLink = await _dbContext.FindAsync<VehicleDriverLink>(vehicleDriverLink.Id);
            if (dbVehicleDriverLink == null)
            {
                return null;
            }

            dbVehicleDriverLink.VehicleId = vehicleDriverLink.VehicleId;
            dbVehicleDriverLink.DriverId = vehicleDriverLink.DriverId;
            dbVehicleDriverLink.StartDate = vehicleDriverLink.StartDate;
            dbVehicleDriverLink.EndDate = vehicleDriverLink.EndDate;
            await _dbContext.SaveChangesAsync();
            return dbVehicleDriverLink;
        }
    }
}