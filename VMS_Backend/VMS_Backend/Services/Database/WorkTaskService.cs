using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.Services.Database
{
    public class WorkTaskService : BaseDatabaseService<WorkTask>
    {
        public WorkTaskService(ApplicationDbContext dbContext) : base(dbContext) { }
        
        public async Task<List<WorkTask>> GetAll(int companyId)
        {
            var tasks = await _dbContext.WorkTask
                .Include(t => (t as WorkTask).Driver)
                .Where(t => t.CompanyId.Equals(companyId))
                .ToListAsync();
            return tasks;
        }

        public async Task<WorkTask> Edit(WorkTask task)
        {
            var dbTask = await _dbContext.FindAsync<WorkTask>(task.Id);
            if (dbTask == null)
            {
                return null;
            }

            dbTask.DriverId = task.DriverId;
            dbTask.OperatorId = task.OperatorId;
            dbTask.DueDate = task.DueDate;
            dbTask.StatusId = task.StatusId;
            dbTask.Comment = task.Comment;
            dbTask.Description = task.Description;
            await _dbContext.SaveChangesAsync();
            return dbTask;
        }
    }
}