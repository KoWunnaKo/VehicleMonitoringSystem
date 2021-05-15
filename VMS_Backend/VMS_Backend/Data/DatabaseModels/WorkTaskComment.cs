using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("work_task_comment")]
    public class WorkTaskComment
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }       
        
        [Column("author_id")]
        public string AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public Employee Author { get; set; }
        
        [Column("text")]
        [MaxLength(5000)]
        public string Text { get; set; }
        
        [Column("date")] 
        public DateTime Date { get; set; }
        
        // [Column("file_path")]
        // [MaxLength(200)]
        // public string FilePath { get; set; }
        
        [Column("task_id")] 
        public int TaskId { get; set; }
        [ForeignKey("TaskId")]
        public WorkTask Task { get; set; }
    }
}