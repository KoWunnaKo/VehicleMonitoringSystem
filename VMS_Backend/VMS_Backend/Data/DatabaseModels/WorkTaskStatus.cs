using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("work_task_status")]
    public class WorkTaskStatus
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