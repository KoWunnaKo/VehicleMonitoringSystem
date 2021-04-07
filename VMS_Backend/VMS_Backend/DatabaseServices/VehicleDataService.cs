using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class VehicleDataService : BaseDatabaseService<VehicleData>
    {
        private IConfiguration Configuration { get; }

        public VehicleDataService(ApplicationDbContext dbContext, IConfiguration configuration) : base(dbContext)
        {
            Configuration = configuration;
        }

        public async Task<List<VehicleData>> GetVehiclesLastData(int companyId)
        {
            await using var con = new NpgsqlConnection(Configuration.GetConnectionString("DefaultConnection"));
            var res = await con.QueryAsync<VehicleData, Vehicle, VehicleData>(
                @"SELECT DISTINCT ON (vd.vehicle_id)
                    vd.*, v.*
                    FROM vehicle_data vd
                    JOIN vehicle v on v.id = vd.vehicle_id and v.company_id = @companyId
                    ORDER BY vd.vehicle_id, vd.datetime DESC",
                (vehicleData, vehicle) =>
                {
                    vehicleData.vehicle = vehicle;
                    return vehicleData;
                },
                new {companyId});
            return res.ToList();
        }

        public async Task<Dictionary<int, List<VehicleData>>> GetVehiclesRangeData(int companyId, string startDateTime, string endDateTime)
        {
            await using var con = new NpgsqlConnection(Configuration.GetConnectionString("DefaultConnection"));
            var vehicleData = await con.QueryAsync<VehicleData>(
                @"SELECT vd.*
                    FROM vehicle_data vd
                    JOIN vehicle v on vd.vehicle_id = v.id and v.company_id = @companyId
                    WHERE  vd.datetime >= to_timestamp(@startDateTime, 'YYYY-MM-DD hh24:mi') 
                      and vd.datetime <= to_timestamp(@endDateTime, 'YYYY-MM-DD hh24:mi')
                    ORDER BY vd.datetime DESC",
                new {companyId, startDateTime, endDateTime});

            var res = new Dictionary<int, List<VehicleData>>();
            foreach (var vd in vehicleData)
            {
                if (res.ContainsKey(vd.vehicle_id))
                {
                    res[vd.vehicle_id].Add(vd);
                }
                else
                {
                    res.Add(vd.vehicle_id, new List<VehicleData> {vd});
                }
            }
            
            return res;
        }
    }
}