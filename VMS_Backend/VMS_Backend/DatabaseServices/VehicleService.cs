using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleService : BaseDatabaseService<Vehicle>
    {
        public VehicleService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Vehicle> AddNewItem(Vehicle vehicleDriverLink)
        {
            return await base.AddNewItem(vehicleDriverLink);
        }
    }
}