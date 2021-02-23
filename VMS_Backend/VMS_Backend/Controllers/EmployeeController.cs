using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

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
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            await _employeeService.AddNewItem(employee);
            return Ok();
        }
    }
}