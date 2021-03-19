using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

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
            var res = await _workTaskService.AddNewItem(task);
            return Ok(res);
        }

        [HttpGet]
        [Route("getAll/{companyId}")]
        public async Task<ActionResult<List<WorkTask>>> GetAll(int companyId)
        {
            return Ok(await _workTaskService.GetAll(companyId));
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
        public async Task<ActionResult> Edit([FromBody] WorkTask task)
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