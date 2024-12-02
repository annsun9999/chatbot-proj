import React from "react";

interface MessageBubbleProps {
  sender: string;
  content: string;
  type: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, content, type }) => {
  const isUser = sender === "user";

  const userIcon = "/images/user-icon.png"; // Replace this with the actual user icon path
  const botIcon = "/images/ai-assistant-icon.png"; // AI assistant icon path

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {/* Icon */}
      {!isUser && (
        <img
          src={botIcon}
          alt="AI Assistant"
          className="w-10 h-auto mr-4"
        />
      )}
      {isUser && (
        <img
          src={userIcon}
          alt="User Icon"
          className="w-10 h-auto ml-4"
        />
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-xl px-4 py-3 rounded-lg shadow ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-black border border-gray-300"
        }`}
      >
        {type === "text" && <p>{content}</p>}
        {type === "image" && (
          <img
            src={content}
            alt="Uploaded"
            className="rounded-md max-w-full h-auto"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;


