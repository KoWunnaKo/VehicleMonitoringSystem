using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VMS_Backend.Data;
using VMS_Backend.Data.Models;

namespace VMS_Backend.DatabaseServices
{
    public class ChatService : BaseDatabaseService<ChatMessage>
    {
        public ChatService(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<List<ChatMessage>> GetAllEmployeeMessages(int companyId, string employeeId)
        {
            var messages = await _dbContext.ChatMessage
                .Include((m => m.Sender))
                .Include((m => m.Receiver))
                .Where(m => m.CompanyId.Equals(companyId) && (m.ReceiverId == employeeId || m.SenderId == employeeId))
                .OrderBy(m => m.Date)
                .ToListAsync();
            return messages;
        }
    }
}