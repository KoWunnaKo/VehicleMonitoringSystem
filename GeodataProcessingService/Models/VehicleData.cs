using System;
using System.Globalization;

namespace GeodataProcessingService.Models
{
    [Dapper.Contrib.Extensions.Table ("vehicle_data")]
    public class VehicleData
    {
        public int vehicle_id { get; set; }
        
        public string user_id { get; set; }
        
        public DateTime datetime { get; set; }
        
        public decimal latitude { get; set; }
        
        public decimal longitude { get; set; }

        public VehicleData(VehicleDataRequest vehicleDataRequest)
        {
            this.vehicle_id = vehicleDataRequest.vehicle_id;
            this.user_id = vehicleDataRequest.user_id;
            this.datetime = DateTime.ParseExact(vehicleDataRequest.datetime, "yyMMddHHmmss", CultureInfo.InvariantCulture);
            this.latitude = vehicleDataRequest.latitude;
            this.longitude = vehicleDataRequest.longitude;
        }

        public static VehicleData[] GetArray(VehicleDataRequest[] vehicleDataRequests)
        {
            VehicleData[] res = new VehicleData[vehicleDataRequests.Length];
            for (int i = 0; i < vehicleDataRequests.Length; ++i)
            {
                res[i] = new VehicleData(vehicleDataRequests[i]);
            }

            return res;
        }
    }
}