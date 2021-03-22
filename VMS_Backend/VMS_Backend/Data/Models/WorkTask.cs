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
        
        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }  
        
        [Column("driver_id")]
        public string DriverId { get; set; }
        [ForeignKey("DriverId")]
        public Employee Driver;
        
        [Column("operator_id")]
        public string OperatorId { get; set; }
        [ForeignKey("OperatorId")]
        public Employee Operator;
        
        [Column("create_date")] 
        public DateTime CreateDate { get; set; }
        
        [Column("due_date")] 
        public DateTime DueDate { get; set; }
        
        [Column("name")]
        public string Name { get; set; }
        
        [Column("description")]
        public string Description { get; set; }
        
        [Column("status_id")]
        public short StatusId { get; set; }
        [ForeignKey("StatusId")]
        public WorkTaskStatus Status;

        [Column("comment")]
        public string Comment { get; set; }
        
        // [Column("from_name")]
        // public string FromName { get; set; }
        //
        // [Column("from_latitude")]
        // public string FromLatitude { get; set; }
        //
        // [Column("from_longitude")]
        // public string FromLongitude { get; set; }
        //
        // [Column("to_name")]
        // public string ToName { get; set; }
        //
        // [Column("to_latitude")]
        // public string ToLatitude { get; set; }
        //
        // [Column("to_longitude")]
        // public string ToLongitude { get; set; }
    }
}