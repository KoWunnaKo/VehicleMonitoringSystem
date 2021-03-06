using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.DatabaseModels;

namespace VMS_Backend.Services.Database
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