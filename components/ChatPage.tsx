"use client";

import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string; type: string }[]>([
    { sender: "bot", content: "Welcome to TrovaOne! How can I assist you today?", type: "text" },
  ]);

  const handleSendMessage = async (text: string, file: File | null) => {
    if (text.trim()) {
      setMessages((prev) => [...prev, { sender: "user", content: text, type: "text" }]);
    }

    if (file) {
      const base64Image = await toBase64(file);
      setMessages((prev) => [...prev, { sender: "user", content: base64Image, type: "image" }]);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          image: file ? await toBase64(file) : null,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", content: data.reply, type: "text" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Sorry, something went wrong.", type: "text" },
      ]);
    }
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Automatically includes the data type (e.g., data:image/jpeg;base64,)
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-500 to-indigo-600 text-white">
      {/* Header */}
      <header className="bg-blue-700 text-white text-center py-6 text-3xl font-bold">
        TrovaOne 
      </header>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-lg overflow-y-auto p-6">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} content={msg.content} type={msg.type} />
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white px-6 py-4 shadow-lg">
        <InputBox onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
