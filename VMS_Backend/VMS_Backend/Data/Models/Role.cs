using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.Models
{
    [Table("role")]
    public class Role
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short Id { get; set; }
        
        [Column("name")]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}