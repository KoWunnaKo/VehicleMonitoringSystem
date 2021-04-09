import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import 'react-chat-elements/dist/main.css';
import { MessageList, ChatList, Input, Button,  } from 'react-chat-elements'
import {StylesDictionary} from "../../utils/StylesDictionary";
import Colors from "../../constants/Colors";
import {useState} from "react";

export const ChatComponent = () => {
    const standardAvatarUrl = 'https://img.icons8.com/pastel-glyph/2x/person-male--v3.png'

    const chatListSampleData = [
        {
            avatar: standardAvatarUrl,
            alt: 'Avatar',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: standardAvatarUrl,
            alt: 'Avatar',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        }
    ];
    const [chatListData, setChatListData] = useState(chatListSampleData);

    const chatMessagesSampleData = [
        {
            position: 'right',
            type: 'text',
            text: 'Hi! Whats up?',
            date: new Date(),
        },
        {
            position: 'left',
            type: 'text',
            text: 'Hi! Im good!',
            date: new Date(),
        }
    ];
    const [chatMessagesData, setChatMessagesData] = useState(chatMessagesSampleData);

    return (
      <div style={styles.container}>
        <div style={styles.contactList}>
          <ChatList
              className='chat-list'
              dataSource={chatListData}
          />
        </div>
        <div style={styles.conversationContainer}>
          <div style={styles.messageList}>
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatMessagesData}
            />
          </div>
          <div style={styles.input}>
            <Input
                placeholder="Type here..."
                multiline={true}
                rightButtons={
                  <Button
                      color='white'
                      backgroundColor='black'
                      text='Send'/>
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
    backgroundColor: Colors.tint,
  },
  conversationContainer: {
    flexDirection: 'column',
    width: 600,
    backgroundColor: Colors.primaryBlue
  },
  contactList: {
    width: 500
  },
  messageList: {
    height: '95vh',
    backgroundColor: Colors.grey
  },
  input: {
    // width: 300,
    // alignSelf: 'flex-end'
  }
};


const authCondition = (authUser: any) => !!authUser;
export const Chat = withAuthorization(authCondition)(ChatComponent);
