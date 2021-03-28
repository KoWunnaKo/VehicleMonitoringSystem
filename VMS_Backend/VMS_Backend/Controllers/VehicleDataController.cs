using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

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

        // TODO add companyId
        [HttpGet]
        [Route("getVehiclesLastData")]
        public async Task<ActionResult<List<VehicleData>>> GetVehiclesLastData()
        {
            return Ok(await _vehicleDataService.GetVehiclesLastData());
        }
        
        // TODO add companyId
        [HttpGet]
        [Route("getVehiclesRangeData/{startDateTime}/{endDateTime}")]
        public async Task<ActionResult<string>> GetVehiclesRangeData(string startDateTime, string endDateTime)
        {
            var res = await _vehicleDataService.GetVehiclesRangeData(startDateTime, endDateTime);
            var json = JsonConvert.SerializeObject(res);
            return Ok(json);
        }
    }
}