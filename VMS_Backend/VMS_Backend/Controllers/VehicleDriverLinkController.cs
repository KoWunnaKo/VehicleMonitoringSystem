using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleDriverLinkController : ControllerBase
    {
        private readonly VehicleDriverLinkService _vehicleDriverLinkService;

        public VehicleDriverLinkController(VehicleDriverLinkService vehicleDriverLinkServiceService)
        {
            _vehicleDriverLinkService = vehicleDriverLinkServiceService;
        }
        
        [HttpPost]
        public async Task<ActionResult<VehicleDriverLink>> Create([FromBody] VehicleDriverLink vehicleDriverLink)
        {
            var now = DateTime.Now;
            
            var currentDriverLink = await _vehicleDriverLinkService.GetCurrentDriverLink(vehicleDriverLink.VehicleId);
            if (currentDriverLink != null)
            {
                currentDriverLink.EndDate = now;
                await _vehicleDriverLinkService.Edit(currentDriverLink);
            }

            var res = await _vehicleDriverLinkService.AddNewItem(vehicleDriverLink, now);
            
            return Ok(res);
        }

        [HttpGet]
        [Route("getCurrentDriverLink/{vehicleId}")]
        public async Task<ActionResult<VehicleDriverLink>> GetCurrentDriverLink(int vehicleId)
        {
            var res = await _vehicleDriverLinkService.GetCurrentDriverLink(vehicleId);
            return Ok(res);
        }
        
        [HttpGet]
        [Route("getCurrentDriver/{vehicleId}")]
        public async Task<ActionResult<Employee>> GetCurrentDriver(int vehicleId)
        {
            var res = await _vehicleDriverLinkService.GetCurrentDriver(vehicleId);
            return Ok(res);
        }
    }
}