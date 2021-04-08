import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";

export const ChatComponent = () => {
  return (
      <h1>Chat page</h1>
  );
}

const authCondition = (authUser: any) => !!authUser;

export const Chat = withAuthorization(authCondition)(ChatComponent);
