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
        [Route("getVehiclesLastData/{companyId}")]
        public async Task<ActionResult<List<VehicleData>>> GetVehiclesLastData(int companyId)
        {
            return Ok(await _vehicleDataService.GetVehiclesLastData(companyId));
        }
        
        [HttpGet]
        [Route("getVehiclesRangeData/{companyId}/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult<string>> GetVehiclesRangeData(int companyId, string startDateTime, string endDateTime)
        {
            var res = await _vehicleDataService.GetVehiclesRangeData(companyId, startDateTime, endDateTime);
            var json = JsonConvert.SerializeObject(res);
            return Ok(json);
        }
    }
}