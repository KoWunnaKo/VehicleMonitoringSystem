using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleMonitoringSystemServer.Data.Models
{
    [Table("vehicle_data")]
    public class VehicleData
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("vehicle_id")]
        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; }

        [Column("date")] 
        public DateTime Date { get; set; }
        
        [Column("latitude")] 
        public decimal Latitude { get; set; }
        
        [Column("longitude")] 
        public decimal Longitude { get; set; }
        
        [Column("fuel_lever")] 
        public decimal FuelLevel { get; set; }
    }
}