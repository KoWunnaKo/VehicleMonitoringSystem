using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.Models
{
    [Table("vehicle_data")]
    public class VehicleData
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        
        [Column("vehicle_id")]
        public int VehicleId { get; set; }
        [ForeignKey("vehicle_id")]
        public Vehicle Vehicle { get; set; }
        
        [Column("user_id")]
        public string UserId { get; set; }
        [ForeignKey("user_id")]
        public Employee Employee { get; set; }

        [Column("datetime")] 
        public DateTime Datetime { get; set; }
        
        [Column("latitude", TypeName = "numeric")] 
        public decimal Latitude { get; set; }
        
        [Column("longitude", TypeName = "numeric")] 
        public decimal Longitude { get; set; }
    }
}