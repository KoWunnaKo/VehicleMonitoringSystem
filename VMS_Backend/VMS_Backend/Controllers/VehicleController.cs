using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.DatabaseModels;
using VMS_Backend.Services.Database;

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
        public async Task<ActionResult<Vehicle>> Create([FromBody] Vehicle vehicle)
        {
            var res = await _vehicleService.AddNewItem(vehicle);
            return Ok(res);
        }

        [HttpGet]
        [Route("getAll/{companyId}")]
        public async Task<ActionResult<List<Vehicle>>> GetAll(int companyId)
        {
            return Ok(await _vehicleService.GetAll(companyId));
        }

        [HttpDelete]
        [Route("{vehicleId}")]
        public async Task<ActionResult> Delete(string vehicleId)
        {
            // TODO delete from DriverVehicleLink
            // TODO or soft delete?
            var res = await _vehicleService.DeleteItemById(vehicleId);
            if (!res)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Edit([FromBody] Vehicle vehicle)
        {
            var res = await _vehicleService.Edit(vehicle);
            if (res != null)
            {
                return Ok(res);
            }

            return NotFound();
        }
    }
}