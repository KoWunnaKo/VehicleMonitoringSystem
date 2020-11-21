using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleMonitoringSystemServer.Data.Models
{
    [Table("vehicle")]
    public class Vehicle
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("driver_id")]
        public Guid DriverId { get; set; }
        [ForeignKey("DriverId")]
        public AppUser Driver;
        
        [Column("name")]
        [MaxLength(50)]
        public string Name { get; set; }
        
        [Column("model")]
        [MaxLength(100)]
        public string Model { get; set; }
        
        [Column("production_year", TypeName = "smallint")]
        public short ProductionYear { get; set; }
        
        [Column("mileage", TypeName = "integer")]
        public int Mileage { get; set; }
    }
}