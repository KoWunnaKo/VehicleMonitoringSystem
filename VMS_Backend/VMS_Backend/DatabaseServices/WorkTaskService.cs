using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class WorkTaskService : BaseDatabaseService<WorkTask>
    {
        public WorkTaskService(ApplicationDbContext dbContext) : base(dbContext) { }
    }
}