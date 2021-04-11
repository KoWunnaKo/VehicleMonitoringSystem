import * as signalR from "@microsoft/signalr";

export class SignalRService {
    private hubConnection: signalR.HubConnection;
    // Id of connected user
    private connectionDbUserId: string;

    constructor() {
        // Builds the SignalR connection, mapping it to /chatHub
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(process.env.REACT_APP_BACKEND_SERVER_URL + "chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    public startConnection(dbUserId: string) {
        // Starts the SignalR connection
        this.hubConnection.start().then(async a => {
            // Once started, invokes the establishConnection in our ChatHub at the Backend.
            if (!!this.hubConnection.connectionId && !!dbUserId) {
                this.configureEndpoints(dbUserId);

                // Establish connection
                this.hubConnection.invoke("establishConnection", dbUserId, this.hubConnection.connectionId);
            }
        });
    }

    public async stopConnection() {
        if (!!this.hubConnection.connectionId) {
            console.log(`signalR, closeConnection`);
            await this.hubConnection.invoke("closeConnection", this.connectionDbUserId, this.hubConnection.connectionId);
            await this.hubConnection.stop();
        }
    }

    private configureEndpoints(dbUserId: string) {
        // Connection established endpoint
        this.hubConnection.on("connectionEstablished", message => {
            console.log(`signalR, connectionEstablished: ${message}`);
            this.connectionDbUserId = dbUserId;
        });

        // Receive chat message endpoint
        this.hubConnection.on("receiveChatMessage", message => {
            console.log(`Message from server received: ${JSON.stringify(message)}`);
        });
    }
}
