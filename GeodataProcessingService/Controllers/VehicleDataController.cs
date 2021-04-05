using System;
using Dapper.Contrib.Extensions;
using GeodataProcessingService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace GeodataProcessingService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleDataController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public VehicleDataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] VehicleDataRequest[] vehicleDataRequests)
        {
            using var con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            VehicleData[] vehicleData = VehicleData.GetArray(vehicleDataRequests);
            con.Insert(vehicleData);
            
            var msg = $"Synced, length = {vehicleDataRequests.Length}, datetime = {DateTime.Now:YYYY-MM-DD HH:mm}";
            Console.WriteLine(msg);
            return Ok(msg);
        }
    }
}