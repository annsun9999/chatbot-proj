import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string; type: string }[]>([
    { sender: "bot", content: "Hello! How can I assist you today?", type: "text" },
  ]);

  const handleSendMessage = (message: string, type: string = "text") => {
    setMessages([...messages, { sender: "user", content: message, type }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", content: "Processing your request...", type: "text" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} content={msg.content} type={msg.type} />
        ))}
      </div>
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
