using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.Models
{
    [Table("work_task")]
    public class WorkTask
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("driver_id")]
        public string DriverId { get; set; }
        [ForeignKey("DriverId")]
        public User Driver;
        
        [Column("operator_id")]
        public string OperatorId { get; set; }
        [ForeignKey("OperatorId")]
        public User Operator;
        
        [Column("create_date")] 
        public DateTime CreateDate { get; set; }
        
        [Column("due_date")] 
        public DateTime DueDate { get; set; }
        
        [Column("task_description")]
        public string TaskDescription { get; set; }
        
        [Column("status_id")]
        public short StatusId { get; set; }
        [ForeignKey("StatusId")]
        public WorkTaskStatus Status;

        [Column("task_comment")]
        public string TaskComment { get; set; }
    }
}