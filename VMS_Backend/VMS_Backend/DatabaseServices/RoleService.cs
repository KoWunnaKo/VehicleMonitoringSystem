using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class RoleService : BaseDatabaseService<Role>
    {
        public RoleService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Role> AddNewItem(Role vehicleDriverLink)
        {
            return await base.AddNewItem(vehicleDriverLink);
        }
    }
}