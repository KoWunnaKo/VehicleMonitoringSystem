using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("company")]
    public class Company
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("name")]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}