using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.Services.Database
{
    public class VehicleDataService : BaseDatabaseService<VehicleData>
    {
        private string DefaultConnectionString { get; }

        public VehicleDataService(ApplicationDbContext dbContext, IConfiguration configuration) : base(dbContext)
        {
            DefaultConnectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<List<VehicleData>> GetVehiclesLastData(int companyId, int? vehicleId, string startDateTime, string endDateTime)
        {
            var vehicleFilter = vehicleId.HasValue ? "and v.id = @vehicleId" : string.Empty;

            await using var con = new NpgsqlConnection(DefaultConnectionString);
            var res = await con.QueryAsync<VehicleData, Vehicle, VehicleData>(
                $@"SELECT DISTINCT ON (vd.vehicle_id)
                    vd.*, v.*
                    FROM vehicle_data vd
                    JOIN vehicle v on v.id = vd.vehicle_id and v.company_id = @companyId {vehicleFilter}
                    WHERE  vd.datetime >= to_timestamp(@startDateTime, 'YYYY-MM-DD hh24:mi') 
                      and vd.datetime <= to_timestamp(@endDateTime, 'YYYY-MM-DD hh24:mi')
                    ORDER BY vd.vehicle_id, vd.datetime DESC",
                (vehicleData, vehicle) =>
                {
                    vehicleData.Vehicle = vehicle;
                    return vehicleData;
                },
                new {companyId, vehicleId, startDateTime, endDateTime});
            return res.ToList();
        }

        public async Task<Dictionary<int, List<VehicleData>>> GetVehiclesRangeData(int companyId, int? vehicleId, string startDateTime, string endDateTime)
        {
            var vehicleFilter = vehicleId.HasValue ? "and v.id = @vehicleId" : string.Empty;
            
            await using var con = new NpgsqlConnection(DefaultConnectionString);
            var vehicleData = (await con.QueryAsync<VehicleData, Vehicle, VehicleData>(
                $@"SELECT vd.*, v.*
                    FROM vehicle_data vd
                    JOIN vehicle v on vd.vehicle_id = v.id and v.company_id = @companyId {vehicleFilter}
                    WHERE  vd.datetime >= to_timestamp(@startDateTime, 'YYYY-MM-DD hh24:mi') 
                      and vd.datetime <= to_timestamp(@endDateTime, 'YYYY-MM-DD hh24:mi')
                    ORDER BY vd.datetime DESC",
                (vd, v) =>
                {
                    vd.Vehicle = v;
                    return vd;
                },
                new {companyId, vehicleId, startDateTime, endDateTime}))
                .ToList();

            var res = vehicleData
                .GroupBy(x => x.Vehicle.Id)
                // .OrderBy(g => g.Key)
                // .ThenByDescending(g => g.Select(g => g.Datetime))
                .Select(x => x)
                .ToDictionary(g => g.Key, 
                    g => g.Select((vd, i) =>
                    {
                        if (i != g.Count() - 1)
                        {
                            vd.Vehicle = null;
                        }
                        return vd;
                    }).ToList());
            
            return res;
        }
    }
}