using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using VMS_Backend.Data.DatabaseModels;

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
            await Clients.Caller.SendAsync("connectionEstablished", connectionId);
            // Console.WriteLine($"ChatHub, connectionEstablished: {connectionId}");
        }
        
        public void CloseConnection(string dbUserId, string connectionId)
        {
            ConnectionsMapping.Remove(dbUserId, connectionId);
            // Console.WriteLine($"ChatHub, connectionClosed: {connectionId}");
        }
        
        public static async Task SendMessage(IHubContext<ChatHub> context, string dbUserId, ChatMessage chatMessage)
        {
            var connectionsList = ConnectionsMapping.GetConnections(dbUserId);
            foreach (var connectionId in connectionsList)
            {
                await context.Clients.Client(connectionId).SendAsync("receiveChatMessage", chatMessage);
                // Console.WriteLine($"ChatHub, messageSend to: {connectionId}");
            }
        }
    }
}