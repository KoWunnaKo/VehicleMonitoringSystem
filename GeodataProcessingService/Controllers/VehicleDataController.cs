using System;
using System.Collections.Generic;
using System.Reflection.Emit;
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
        public IActionResult Post([FromBody] VehicleDataRequest[] vehicleDataRequests)
        {
            using var con = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            VehicleData[] vehicleData = VehicleData.GetArray(vehicleDataRequests);
            con.Insert(vehicleData);
            Console.WriteLine($"Synced, length = {vehicleDataRequests.Length}");
            return Ok(new[] { new
            {
                result = "OK"
            }});
        }
    }
}