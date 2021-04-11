using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using VMS_Backend.Data.Models;

namespace VMS_Backend.Services.SignalR
{
    /// <summary>
    /// SignalR hub for real-time chatting
    /// </summary>
    public class ChatHub : Hub
    {
        // EmployeeId -> [connectionsId]
        private static readonly HubConnectionMapping<string> ConnectionsMapping = 
            new HubConnectionMapping<string>();
        
        public async Task EstablishConnection(string dbUserId, string connectionId)
        {
            ConnectionsMapping.Add(dbUserId, connectionId);
            await Clients.Caller.SendAsync("setClientMessage", "A connection with ID '" + connectionId + "' has just connected");
        }
        
        // TODO CloseConnection
        
        public static async Task SendMessage(IHubContext<ChatHub> context, string dbUserId, ChatMessage chatMessage)
        {
            var connectionsList = ConnectionsMapping.GetConnections(dbUserId);
            foreach (var connectionId in connectionsList)
            {
                await context.Clients.Client(connectionId).SendAsync("setChatMessage", chatMessage);
            }
        }
    }
}