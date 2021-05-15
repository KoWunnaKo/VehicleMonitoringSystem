import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {withAuthorization} from "../../firebase/withAuthorization";
import 'react-chat-elements/dist/main.css';
import {Button, ChatList, Input, MessageList,} from 'react-chat-elements'
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import * as ChatApi from "../../api/chatApi";
import ChatContact from "../../models/chatContact";
import {getContactsList} from "../../utils/chatUtil";
import ChatMessage, {MessageTypeConstants} from "../../models/chatMessage";
import {getDbUser} from "../../utils/userUtil";
import {IconButton} from "@material-ui/core";
import {PersonAdd} from "@material-ui/icons";
import Popup from "reactjs-popup";
import {AddEmployeeContactForm} from "../../components/employee/addEmployeeContact";
import Employee from "../../models/employee";
import Colors from "../../constants/colors";
import {AttachImageForm} from "../../components/utils/attachImageForm";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

export const ChatComponent = () => {
    const [chatContacts, setChatContacts] = useState<ChatContact[]>();
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>();
    const [receiver, setReceiver] = useState<ChatContact|null>();
    const [inputMessage, setInputMessage] = useState<string>('');

    const [attachmentFile, setAttachmentFile] = useState();
    const [attachmentFileName, setAttachmentFileName] = useState();

    let messageInputRef: HTMLInputElement | null;

    // // Receive chat message endpoint
    //  SignalRService.addEndpoint("receiveChatMessage", message => {
    //     console.log(`Message from server received: ${JSON.stringify(message)}`);
    // });

    useEffect(() => {
        (async function() {
            await updateChat();
        })();
    }, []);

    const updateChat = async () => {
        const messages = await ChatApi.getAllEmployeeMessages();
        const contactList: ChatContact[] = await getContactsList(messages);
        setChatContacts(contactList);

        if (!!receiver) {
            const chatContact = contactList.find(c => c.employee.id === receiver.employee.id);
            if (!!chatContact) {
                setReceiver(chatContact);
                setChatMessages(chatContact.chatMessages);
            }
        } else {
            if (contactList.length > 0) {
                const chatContact = contactList[0];
                setReceiver(chatContact);
                setChatMessages(chatContact.chatMessages);
            }
        }
    }

    const contactListClick = (chatContact: any) => {
        setReceiver(chatContact);
        setChatMessages(chatContact.chatMessages);
    }

    const sendMessage = async () => {
        const dbUser = await getDbUser();
        if (!!dbUser && !!receiver) {

            if (!attachmentFile) {
                const msg = new ChatMessage(undefined, dbUser.companyId, inputMessage,
                    undefined, true, dbUser, receiver.employee,
                    MessageTypeConstants.TEXT, null);
                await ChatApi.createMessage(msg);
                setInputMessage('');
            } else {
                const formData = new FormData();
                formData.append("formFile", attachmentFile);
                formData.append("fileName", attachmentFileName);

                await ChatApi.createMessageWithAttachment(dbUser.companyId, dbUser.id, receiver.employee.id, inputMessage, formData);
                await updateChat();
            }
            await updateChat();
        }
    }

    const sendAttachment = async () => {
        const dbUser = await getDbUser();
        if (!!dbUser && !!receiver) {
            const formData = new FormData();
            formData.append("formFile", attachmentFile);
            formData.append("fileName", attachmentFileName);

            await ChatApi.createMessageWithAttachment(dbUser.companyId, dbUser.id, receiver.employee.id, inputMessage, formData);
            await updateChat();
        }
    }

    const saveAttachment = (file: any, fileName: string) => {
        setAttachmentFile(file);
        setAttachmentFileName(fileName);

        const inputText = `[${fileName}]`;
        setInputMessage(inputText);
        if (messageInputRef) {
            messageInputRef.value = inputText;
        }
    }

    const selectContact = async (e: Employee) => {
        const chatContact = chatContacts && chatContacts.find(c => c.employee.id === e.id);
        if (chatContact) {
            // Contact from selected
            setReceiver(chatContact);
            setChatMessages(chatContact.chatMessages);
        } else {
            // New contact
            const newChatContact = new ChatContact(e, []);
            if (chatContacts !== undefined) {
                chatContacts.push(newChatContact);
            }
            setReceiver(newChatContact);
            setChatMessages([]);
        }
    }

    return (
      <div style={styles.container}>
        <div style={styles.contactList}>

            <Popup
                trigger={
                    <IconButton>
                        <PersonAdd/>
                    </IconButton>
                }
                modal={true}
                nested={true}
            >
                {(close: any) => {

                    return (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div>
                                <AddEmployeeContactForm closeModal={close} selectContact={selectContact}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <ChatList
                className='chat-list'
                dataSource={chatContacts}
                onClick={e => contactListClick(e)}
            />
        </div>
        <div style={styles.conversationContainer}>
          <div style={styles.messageList}>
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatMessages}
            />
          </div>
          <div style={styles.input}>
            <Input
                inputRef={node => (messageInputRef = node)}
                placeholder="Type here..."
                onChange={event => setInputMessage(event.target.value)}
                multiline={true}

                rightButtons={
                    <div>
                        {/*TODO change on icons*/}
                        <Popup
                            trigger={
                                <Button
                                    color='white'
                                    backgroundColor={Colors.primary}
                                    text='Attach'
                                />
                            }
                            modal={true}
                            nested={true}
                        >
                            {(close: any) => {
                                return (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <AttachImageForm closeModal={close} saveAttachment={saveAttachment}/>
                                    </div>
                                )
                            }}
                        </Popup>


                        <Button
                            // TODO may be removed
                            color='white'
                            backgroundColor={Colors.primary}
                            text='Update'
                            onClick={updateChat}
                        />
                        <Button
                            color='white'
                            backgroundColor={Colors.primary}
                            text='Send'
                            onClick={sendMessage}
                        />
                    </div>
                }
            />
          </div>
        </div>
      </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0.95
    },
    conversationContainer: {
        flexDirection: 'column',
        width: '70vw',
        display: 'flex'
    },
    contactList: {
        width: '30vw',
        backgroundColor: Colors.contactList
    },
    messageList: {
        flex: 0.88,
        backgroundColor: Colors.background,
        overflowY: 'scroll'
    },
    input: {
        flex: 0.12
    },
    addContactIcon: {
        // blockSize: 50,
        // alignSelf: 'center'
    }
};


const authCondition = (authUser: any) => !!authUser;
export const Chat = withAuthorization(authCondition)(ChatComponent);
