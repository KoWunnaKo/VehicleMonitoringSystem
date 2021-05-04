import * as signalR from "@microsoft/signalr";
import addNotification from "react-push-notification";
import ChatMessage from "../../models/chatMessage";
import Employee from "../../models/employee";

type EndpointMethod = (message: any) => void;

export abstract class SignalRService {
    public static startConnection(dbUserId: string) {
        // Starts the signalR connection
        this.hubConnection.start().then(async a => {
            // Once started, invokes the establishConnection in our ChatHub at the Backend.
            if (!!this.hubConnection.connectionId && !!dbUserId) {
                this.configureEndpoints(dbUserId);

                // Establish connection
                this.hubConnection.invoke("establishConnection", dbUserId, this.hubConnection.connectionId);
            }
        });
    }

    public static async stopConnection() {
        if (!!this.hubConnection.connectionId) {
            // console.log(`signalR, closeConnection`);
            await this.hubConnection.invoke("closeConnection", this.connectionDbUserId, this.hubConnection.connectionId);
            await this.hubConnection.stop();
        }
    }

    public static addEndpoint(methodName: string, method: EndpointMethod) {
        if (!this.endpointsSet.has(methodName)) {
            // console.log(`addEndpoint, name: ${methodName}`);
            this.hubConnection.on(methodName, method);
            this.endpointsSet.add(methodName);
        } else {
            // console.log(`addEndpoint, endpoint already exists, name: ${methodName}`);
        }
    }

    // Connection hub
    private static hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect()
        .withUrl(process.env.REACT_APP_BACKEND_SERVER_URL + "chatHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // Id of connected user
    private static connectionDbUserId: string;

    // Set of added endpoints - to avoid duplicates
    private static endpointsSet: Set<string> = new Set<string>();

    private static configureEndpoints(dbUserId: string) {
        // Connection established endpoint
        this.addEndpoint("connectionEstablished", message => {
            // console.log(`signalR, connectionEstablished: ${message}`);
            this.connectionDbUserId = dbUserId;
        });

        // Receive chat message endpoint
        this.addEndpoint("receiveChatMessage", message => {
            const msg: ChatMessage = message;
            Object.setPrototypeOf(msg, ChatMessage.prototype)
            Object.setPrototypeOf(msg.receiver, Employee.prototype)
            Object.setPrototypeOf(msg.sender, Employee.prototype)

            // console.log(`Message from server received: ${JSON.stringify(msg)}`);
            const maxMsgLength = 150;
            const notificationMsg =
                msg.text.length >= maxMsgLength
                    ? msg.text.substr(0, maxMsgLength) + '...'
                    : msg.text;
            addNotification({
                title: 'Chat',
                subtitle: msg.sender.getFullName(),
                message: notificationMsg,
                theme: 'light',
            });
        });
    }
}
