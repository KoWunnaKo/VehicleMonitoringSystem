using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace VMS_Backend.DatabaseServices
{
    /// <summary>
    /// SignalR hub for real-time chatting
    /// </summary>
    public class ChatHub : Hub
    {
        public async Task SendConnectionId(string connectionId)
        {
            await Clients.Caller.SendAsync("setClientMessage", "A connection with ID '" + connectionId + "' has just connected");
        }

        public async Task SendMessage()
        {
            // await Clients.Client()
        }
    }
}