using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using VMS_Backend.Data.Models;
using VMS_Backend.Services.Database;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleDataController : ControllerBase
    {
        private readonly VehicleDataService _vehicleDataService;

        public VehicleDataController(VehicleDataService vehicleDataService)
        {
            _vehicleDataService = vehicleDataService;
        }

        [HttpGet]
        [Route("getVehiclesLastData/{companyId}/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult<List<VehicleData>>> GetVehiclesLastData(int companyId, string startDateTime, string endDateTime, [FromQuery] int? vehicleId = null)
        {
            return Ok(await _vehicleDataService.GetVehiclesLastData(companyId, vehicleId, startDateTime, endDateTime));
        }
        
        [HttpGet]
        [Route("getVehiclesRangeData/{companyId}/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult<string>> GetVehiclesRangeData(int companyId, string startDateTime, string endDateTime, [FromQuery] int? vehicleId = null)
        {
            return Ok(await _vehicleDataService.GetVehiclesRangeData(companyId, vehicleId, startDateTime, endDateTime));
        }
    }
}