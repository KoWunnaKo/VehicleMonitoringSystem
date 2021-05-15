using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("task")]
    public class WorkTaskController : ControllerBase
    {
        private readonly WorkTaskService _workTaskService;

        public WorkTaskController(WorkTaskService workTaskService)
        {
            _workTaskService = workTaskService;
        }
        
        [HttpPost]
        public async Task<ActionResult<WorkTask>> Create([FromBody] WorkTask task)
        {
            task.CreateDate = DateTime.Now;
            task.StatusId = 1; // Created
            task.DueDate = task.DueDate.ToLocalTime();
            var res = await _workTaskService.AddNewItem(task);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getAll/{companyId}")]
        public async Task<ActionResult<List<WorkTask>>> GetAll(int companyId)
        {
            return Ok(await _workTaskService.GetAll(companyId));
        }
        
        [HttpGet]
        [Route("getAllForDriver/{companyId}/{driverId}")]
        public async Task<ActionResult<List<WorkTask>>> GetAllForEmployee(int companyId, string driverId)
        {
            return Ok(await _workTaskService.GetAllForDriver(companyId, driverId));
        }

        [HttpDelete]
        [Route("{taskId}")]
        public async Task<ActionResult> Delete(string taskId)
        {
            var res = await _workTaskService.DeleteItemById(taskId);
            if (!res)
            {
                return NotFound();
            }

            return Ok();
        }
        
        [HttpPut]
        [Route("updateStatus/{taskId}/{statusId}")]
        public async Task<ActionResult<WorkTask>> ChangeStatus(int taskId, short statusId)
        {
            var res = await _workTaskService.ChangeStatus(taskId, statusId);
            if (res != null)
            {
                return Ok(res);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpPut]
        public async Task<ActionResult<WorkTask>> Edit([FromBody] WorkTask task)
        {
            var res = await _workTaskService.Edit(task);
            if (res != null)
            {
                return Ok(res);
            }
            else
            {
                return NotFound();
            }
        }
    }
}