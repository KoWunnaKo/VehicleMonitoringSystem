using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.Services.Database
{
    public class RoleService : BaseDatabaseService<Role>
    {
        public RoleService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Role> AddNewItem(Role item)
        {
            return await base.AddNewItem(item);
        }
    }
}