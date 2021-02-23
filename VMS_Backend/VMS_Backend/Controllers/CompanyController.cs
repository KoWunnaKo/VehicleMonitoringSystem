using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Company company)
        {
            await _companyService.AddNewItem(company);
            return Ok();
        }
    }
}