using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class EmployeeService : BaseDatabaseService<Employee>
    {
        public EmployeeService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Employee> AddNewItem(Employee vehicleDriverLink)
        {
            return await base.AddNewItem(vehicleDriverLink);
        }
    }
}