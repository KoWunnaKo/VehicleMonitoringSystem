using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleMonitoringSystemServer.Data.Models
{
    [Table("work_task_status")]
    public class WorkTaskStatus
    {
        [Key]
        [Column("id")]
        public short Id { get; set; }
        
        [Column("name")]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}