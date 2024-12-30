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
          src={botIcon || "/images/default-bot-icon.png"}
          alt="AI Assistant"
          className="w-7 h-7 rounded-full object-cover mr-4"
        />
      )}
      {isUser && (
        <img
          src={userIcon || "/images/default-user-icon.png"}
          alt="User Icon"
          className="w-7 h-7 rounded-full object-cover ml-4"
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
        {type === "text" && (
          <div
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
          />
        )}
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

// Helper function to format the message
const formatMessage = (text: string): string => {
  // Replace table-style Markdown with proper HTML table
  if (text.includes("|")) {
    return convertMarkdownTableToHTML(text);
  }

  // Add more formatting logic if needed
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Bold formatting
  text = text.replace(/\n/g, "<br>"); // Line breaks
  return text;
};

// Helper to convert Markdown table to HTML table
const convertMarkdownTableToHTML = (markdown: string): string => {
  const lines = markdown.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split("|").filter((header) => header.trim() !== "");
  const rows = lines.slice(2).map((line) =>
    line.split("|").filter((cell) => cell.trim() !== "")
  );

  let html = "<table class='table-auto border-collapse border border-gray-300 w-full'>";
  html += "<thead><tr>";
  headers.forEach((header) => {
    html += `<th class='border border-gray-300 px-4 py-2 bg-gray-200'>${header.trim()}</th>`;
  });
  html += "</tr></thead>";

  html += "<tbody>";
  rows.forEach((row) => {
    html += "<tr>";
    row.forEach((cell) => {
      html += `<td class='border border-gray-300 px-4 py-2'>${cell.trim()}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";

  return html;
};

export default MessageBubble;
