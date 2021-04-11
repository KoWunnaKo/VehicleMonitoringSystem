using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VMS_Backend.Data.Models;
using VMS_Backend.Services.Database;
using VMS_Backend.Services.SignalR;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(ChatService chatService, IHubContext<ChatHub> hubContext)
        {
            _chatService = chatService;
            _hubContext = hubContext;
        }
        
        // TODO images upload
        [HttpPost]
        public async Task<ActionResult<ChatMessage>> Create([FromBody] ChatMessage message)
        {
            message.Date = DateTime.Now;
            message.Unread = true;
            if (string.IsNullOrEmpty(message.SenderId) && string.IsNullOrEmpty(message.ReceiverId))
            {
                message.SenderId = message.Sender.Id;
                message.ReceiverId = message.Receiver.Id;
            }

            var sender = message.Sender;
            var receiver = message.Receiver;
            
            message.Sender = null;
            message.Receiver = null;
            var res = await _chatService.AddNewItem(message);

            res.Sender = sender;
            res.Receiver = receiver;
            // SignalR message to client
            await ChatHub.SendMessage(_hubContext, res.ReceiverId, res);

            return Ok(res);
        }
        
        [HttpGet]
        [Route("getAllEmployeeMessages/{companyId}/{employeeId}")]
        public async Task<ActionResult<List<WorkTask>>> GetAllEmployeeMessages(int companyId, string employeeId)
        {
            return Ok(await _chatService.GetAllEmployeeMessages(companyId, employeeId));
        }
    }
}