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
        public int Id { get; set; }

        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }  
        
        [Column("name")]
        [MaxLength(50)]
        public string Name { get; set; }
        
        [Column("number")]
        [MaxLength(20)]
        public string Number { get; set; }
        
        [Column("model")]
        [MaxLength(50)]
        public string Model { get; set; }
        
        [Column("production_year", TypeName = "smallint")]
        public short ProductionYear { get; set; }
    }
}