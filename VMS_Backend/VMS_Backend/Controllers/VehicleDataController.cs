using Microsoft.AspNetCore.Mvc;
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
    }
}