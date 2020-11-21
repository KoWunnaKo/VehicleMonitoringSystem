using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleMonitoringSystemServer.Data.Models
{
    [Table("work_task")]
    public class WorkTask
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("driver_id")]
        public Guid DriverId { get; set; }
        [ForeignKey("DriverId")]
        public AppUser Driver;
        
        [Column("operator_id")]
        public Guid OperatorId { get; set; }
        [ForeignKey("OperatorId")]
        public AppUser Operator;
        
        [Column("create_date")] 
        public DateTime CreateDate { get; set; }
        
        [Column("due_date")] 
        public DateTime DueDate { get; set; }
        
        [Column("status_id")]
        public short StatusId { get; set; }
        [ForeignKey("StatusId")]
        public WorkTaskStatus Status;
    }
}