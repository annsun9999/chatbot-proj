import React from "react";

interface MessageBubbleProps {
  sender: string;
  content: string;
  type: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, content, type }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {type === "text" && <p>{content}</p>}
        {type === "image" && <img src={content} alt="Uploaded content" className="rounded-md" />}
        {type === "file" && (
          <a href={content} download className="text-blue-700 underline">
            Download File
          </a>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
