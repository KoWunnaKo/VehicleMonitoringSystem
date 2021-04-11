using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
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
        public async Task<List<Employee>> GetAll(int companyId)
        {
            return await _employeeService.GetAllDrivers(companyId);
        }

        [HttpDelete]
        [Route("delete/{userId}")]
        public async Task<bool> Delete(string userId)
        {
            return await _employeeService.DeleteItemById(userId);
        }
    }
}