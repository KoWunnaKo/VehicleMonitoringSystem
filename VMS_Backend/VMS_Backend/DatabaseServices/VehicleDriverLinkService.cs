using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleDriverLinkService : BaseDatabaseService<VehicleDriverLink>
    {
        public VehicleDriverLinkService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<VehicleDriverLink> AddNewItem(VehicleDriverLink vehicleDriverLink)
        {
            return await base.AddNewItem(vehicleDriverLink);
        }
    }
}