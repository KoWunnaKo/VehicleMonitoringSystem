using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class CompanyService : BaseDatabaseService<Company>
    {
        public CompanyService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Company> AddNewItem(Company item)
        {
            return await base.AddNewItem(item);
        }
    }
}