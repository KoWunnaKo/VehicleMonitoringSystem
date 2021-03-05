using System.Collections.Generic;
using System.Data;
using System.Linq;
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

        public List<VehicleData> GetVehiclesLastData()
        {
            using IDbConnection db = new NpgsqlConnection(Configuration.GetConnectionString("DefaultConnection"));
            const string query = @"SELECT DISTINCT ON (vehicle_id)
                                    user_id, datetime, latitude, longitude
                                    FROM vehicle_data
                                    ORDER BY vehicle_id, datetime DESC";
            return db.Query<VehicleData>(query).ToList();
        }
    }
}