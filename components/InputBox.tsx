import React, { useState } from "react";

interface InputBoxProps {
  onSendMessage: (message: string, type: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text, "text");
      setText("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onSendMessage(fileUrl, type);
    }
  };

  return (
    <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Type your message..."
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
      />
      <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Send
      </button>
      <label className="ml-2 cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "image")} />
        📷
      </label>
      <label className="ml-2 cursor-pointer">
        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "file")} />
        📄
      </label>
    </div>
  );
};

export default InputBox;
