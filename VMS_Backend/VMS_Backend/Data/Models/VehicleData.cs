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
        public long id { get; set; }
        
        [Column("vehicle_id")]
        public int vehicle_id { get; set; }
        [ForeignKey("vehicle_id")]
        public Vehicle vehicle { get; set; }
        
        [Column("user_id")]
        public string user_id { get; set; }
        [ForeignKey("user_id")]
        public Employee employee { get; set; }

        [Column("datetime")] 
        public DateTime datetime { get; set; }
        
        [Column("latitude", TypeName = "numeric")] 
        public decimal latitude { get; set; }
        
        [Column("longitude", TypeName = "numeric")] 
        public decimal longitude { get; set; }
    }
}