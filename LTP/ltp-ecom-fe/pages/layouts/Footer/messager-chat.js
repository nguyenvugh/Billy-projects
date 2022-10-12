import ReactDOM from "react-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";

export const idMessenger = "footer-messager";

const MessageChat = () => {
  if (typeof window !== "undefined") {
    return ReactDOM.createPortal(
      <MessengerCustomerChat pageId="338906826790120" appId="1072629353496070" />,
      document.getElementById(idMessenger),
    );
  }
  return null;
};

export default MessageChat;
