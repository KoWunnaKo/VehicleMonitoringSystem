using System;

namespace GeodataProcessingService.Models
{
    public class VehicleDataRequest
    {
        public int vehicle_id { get; set; }
        
        public string user_id { get; set; }
        
        public string datetime { get; set; }
        
        public decimal latitude { get; set; }
        
        public decimal longitude { get; set; }
    }
}