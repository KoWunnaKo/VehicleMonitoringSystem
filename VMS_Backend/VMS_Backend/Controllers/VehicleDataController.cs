using System;
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
        public async Task<List<VehicleData>> GetVehiclesLastData()
        {
            return await _vehicleDataService.GetVehiclesLastData();
        }
        
        // TODO add companyId
        [HttpGet]
        [Route("getVehiclesRangeData/{from}/{to}")]
        public async Task<string> GetVehiclesRangeData(string from, string to)
        {
            // TODO remove
            from = "2021-03-05 17:00";
            to = "2021-03-05 18:45";
            var res = await _vehicleDataService.GetVehiclesRangeData(from, to);
            var json = JsonConvert.SerializeObject(res);
            return json;
        }
    }
}