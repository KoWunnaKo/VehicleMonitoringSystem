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
        
        public async Task<List<WorkTask>> GetAllForDriver(int companyId, string driverId)
        {
            var tasks = await _dbContext.WorkTask
                .Include(t => t.Operator)
                .Where(t => t.CompanyId.Equals(companyId) && t.DriverId.Equals(driverId))
                .OrderBy(t => t.StatusId)
                .ToListAsync();
            return tasks;
        }

        public async Task<WorkTask> ChangeStatus(int taskId, short statusId)
        {
            var dbTask = await _dbContext.FindAsync<WorkTask>(taskId);
            if (dbTask == null)
            {
                return null;
            }

            dbTask.StatusId = statusId;
            await _dbContext.SaveChangesAsync();
            return dbTask;
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
            dbTask.DueDate = task.DueDate.ToLocalTime();
            dbTask.StatusId = task.StatusId;
            dbTask.Description = task.Description;
            dbTask.Name = task.Name;
            await _dbContext.SaveChangesAsync();
            return dbTask;
        }
    }
}