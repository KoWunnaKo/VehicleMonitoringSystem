using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("taskComment")]
    public class WorkTaskCommentController : ControllerBase
    {
        private readonly WorkTaskCommentService _workTaskCommentService;

        public WorkTaskCommentController(WorkTaskCommentService workTaskCommentService)
        {
            _workTaskCommentService = workTaskCommentService;
        }
        
        [HttpPost]
        public async Task<ActionResult<WorkTaskComment>> Create([FromBody] WorkTaskComment taskComment)
        {
            taskComment.Date = DateTime.Now;
            
            var res = await _workTaskCommentService.AddNewItem(taskComment);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getAllForTask/{companyId}/{taskId}")]
        public async Task<ActionResult<List<WorkTaskComment>>> GetAllForTask(int companyId, int taskId)
        {
            return Ok(await _workTaskCommentService.GetAllForTask(companyId, taskId));
        }

        [HttpDelete]
        [Route("{taskCommentId}")]
        public async Task<ActionResult> Delete(string taskId)
        {
            var res = await _workTaskCommentService.DeleteItemById(taskId);
            if (!res)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}