using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.Services.Database
{
    public class WorkTaskCommentService : BaseDatabaseService<WorkTaskComment>
    {
        public WorkTaskCommentService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<WorkTaskComment> AddNewItem(WorkTaskComment item)
        {
            var dbItem = await base.AddNewItem(item);
            return _dbContext.WorkTaskComment
                .Include(t => t.Author)
                .FirstOrDefault(t => t.Id.Equals(dbItem.Id));
        }

        public async Task<List<WorkTaskComment>> GetAllForTask(int companyId, int taskId)
        {
            var tasks = await _dbContext.WorkTaskComment
                .Include(t => t.Author)
                .Where(t => t.CompanyId.Equals(companyId) && t.TaskId.Equals(taskId))
                .OrderBy(t => t.Date)
                .ToListAsync();
            return tasks;
        }
    }
}