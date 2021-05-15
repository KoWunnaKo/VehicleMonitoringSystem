using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        
        [HttpGet]
        [Route("getAllDrivers/{companyId}")]
        public async Task<ActionResult<List<Employee>>> GetAllDrivers(int companyId)
        {
            return Ok(await _employeeService.GetAllDrivers(companyId));
        }
        
        [HttpGet]
        [Route("getAllEmployees/{companyId}")]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees(int companyId)
        {
            return Ok(await _employeeService.GetAllEmployees(companyId));
        }

        [HttpDelete]
        [Route("{userId}")]
        public async Task<ActionResult> Delete(string userId)
        {
            // TODO delete from DriverVehicleLink
            // TODO delete chatMessages
            // TODO or soft delete?
            var res = await _employeeService.DeleteItemById(userId);
            if (!res)
            {
                return NotFound();
            }

            return Ok();
        }
        
        [HttpPut]
        public async Task<ActionResult<Employee>> Edit([FromBody] Employee employee)
        {
            var res = await _employeeService.Edit(employee);
            if (res != null)
            {
                return Ok(res);
            }

            return NotFound();
        }
    }
}