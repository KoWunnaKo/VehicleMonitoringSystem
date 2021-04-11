using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public AuthController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [Route("current/{firebaseUserId}")]
        public async Task<Employee> Current(string firebaseUserId)
        {
            return await _employeeService.GetCurrent(firebaseUserId);
        }
        
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            await _employeeService.AddNewItem(employee);
            return Ok();
        }
    }
}