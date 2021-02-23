using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleDataService : BaseDatabaseService<VehicleData>
    {
        public VehicleDataService(ApplicationDbContext dbContext) : base(dbContext) { }
    }
}