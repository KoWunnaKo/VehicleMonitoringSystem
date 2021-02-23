using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleService _vehicleService;

        public VehicleController(VehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Vehicle vehicle)
        {
            await _vehicleService.AddNewItem(vehicle);
            return Ok();
        }
    }
}