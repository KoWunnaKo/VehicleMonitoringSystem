using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class EmployeeService : BaseDatabaseService<Employee>
    {
        public EmployeeService(ApplicationDbContext dbContext) : base(dbContext) { }
        
        public async Task<Employee> GetCurrent(string firebaseUserId)
        {
            var employee = await _dbContext.Employee
                .Where((e => e.Id.Equals(firebaseUserId)))
                .Include((e => e.Role))
                .FirstOrDefaultAsync();
            return employee;
        }
    }
}