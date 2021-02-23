using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleDriverLinkController : ControllerBase
    {
        private readonly VehicleDriverLinkService _vehicleDriverLink;

        public VehicleDriverLinkController(VehicleDriverLinkService vehicleDriverLinkService)
        {
            _vehicleDriverLink = vehicleDriverLinkService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] VehicleDriverLink vehicleDriverLink)
        {
            await _vehicleDriverLink.AddNewItem(vehicleDriverLink);
            return Ok();
        }
    }
}