using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("chat_message")]
    public class ChatMessage
    {
        public ChatMessage(int companyId, string senderId, string receiverId, string attachmentPath)
        {
            CompanyId = companyId;
            Date = DateTime.Now;
            SenderId = senderId;
            ReceiverId = receiverId;
            AttachmentPath = attachmentPath;
            Type = "photo";
            Unread = true;
        }
        
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }       
        
        [Column("text")]
        [MaxLength(2000)]
        public string Text { get; set; }
        
        [Column("date")] 
        public DateTime Date { get; set; }
        
        [Column("unread")]
        public bool Unread { get; set; }
        
        [Column("sender_id")] 
        public string SenderId { get; set; }
        [ForeignKey("SenderId")]
        public Employee Sender { get; set; }  
        
        [Column("receiver_id")] 
        public string ReceiverId { get; set; }
        [ForeignKey("ReceiverId")]
        public Employee Receiver { get; set; }
        
        [Column("type")]
        // text or file
        public string Type { get; set; }
        
        // TODO rename to attachmentName
        [Column("attachment_path")]
        public string AttachmentPath { get; set; }
    }
}