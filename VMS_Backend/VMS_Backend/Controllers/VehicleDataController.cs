using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
    }
}