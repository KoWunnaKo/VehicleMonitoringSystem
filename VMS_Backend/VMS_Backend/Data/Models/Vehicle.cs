using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.Models
{
    [Table("vehicle")]
    public class Vehicle
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("company_id")] 
        public int company_id { get; set; }
        [ForeignKey("company_id")]
        public Company company { get; set; }  
        
        [Column("name")]
        [MaxLength(50)]
        public string name { get; set; }
        
        [Column("number")]
        [MaxLength(20)]
        public string number { get; set; }
        
        [Column("model")]
        [MaxLength(50)]
        public string model { get; set; }
        
        [Column("production_year", TypeName = "smallint")]
        public short production_year { get; set; }
    }
}