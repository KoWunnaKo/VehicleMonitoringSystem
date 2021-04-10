using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }
        
        // TODO images upload
        [HttpPost]
        public async Task<ActionResult<ChatMessage>> Create([FromBody] ChatMessage message)
        {
            message.Date = DateTime.Now;
            message.Unread = true;
            message.SenderId = message.Sender.Id;
            message.ReceiverId = message.Receiver.Id;
            message.Sender = null;
            message.Receiver = null;
            var res = await _chatService.AddNewItem(message);
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