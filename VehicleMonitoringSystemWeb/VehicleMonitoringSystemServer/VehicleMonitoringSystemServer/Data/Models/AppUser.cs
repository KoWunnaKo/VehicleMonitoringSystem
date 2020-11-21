using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace VehicleMonitoringSystemServer.Data.Models
{
    [Table("app_user")]
    public class AppUser : IdentityUser
    {
        [Key]
        [Column("telegram_nickname")]
        [MaxLength(34)]
        public string TelegramNickname { get; set; }
    }
}