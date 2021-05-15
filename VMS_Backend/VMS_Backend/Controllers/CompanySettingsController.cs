using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanySettingsController : ControllerBase
    {
        private readonly CompanySettingsService _companySettingsService;

        public CompanySettingsController(CompanySettingsService companySettingsService)
        {
            _companySettingsService = companySettingsService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CompanySettings companySettings)
        {
            return Ok(await _companySettingsService.AddNewItem(companySettings));
        }
        
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] CompanySettings companySettings)
        {
            return Ok(await _companySettingsService.Edit(companySettings));
        }
        
        [HttpGet]
        [Route("{companyId}")]
        public async Task<IActionResult> Get(int companyId)
        {
            return Ok(await _companySettingsService.FindItemByIdAsync(companyId.ToString()));
        }
    }
}