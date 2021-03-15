using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkTaskController : ControllerBase
    {
        private readonly WorkTaskService _workTaskService;

        public WorkTaskController(WorkTaskService workTaskService)
        {
            _workTaskService = workTaskService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] WorkTask task)
        {
            var res = await _workTaskService.AddNewItem(task);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            return Ok(_workTaskService.GetAll());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(WorkTask task)
        {
            var res = await _workTaskService.DeleteItem(task);
            if (!res)
            {
                return NotFound();
            }

            return Ok();
        }

        // [HttpPut]
        // public async Task<IActionResult> Edit(WorkTask task)
        // {
        //     _workTaskService
        // }
    }
}