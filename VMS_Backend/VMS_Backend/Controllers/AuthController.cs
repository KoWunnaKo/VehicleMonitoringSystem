using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

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
        
        [HttpPost]
        [Route("signUp")]
        public async Task<IActionResult> SignUp([FromBody] Employee employee)
        {
            await _employeeService.AddNewItem(employee);
            return Ok();
        }
    }
}