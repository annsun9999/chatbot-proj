"use client";

import React, { useState } from "react";

interface InputBoxProps {
  onSendMessage: (text: string, file: File | null) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSend = () => {
    const file = document.getElementById("file-input") as HTMLInputElement;
    const uploadedFile = file?.files?.[0] || null;

    if (text.trim() || uploadedFile) {
      onSendMessage(text, uploadedFile);
      setText("");
      setFileName(null);
      if (file) file.value = ""; // Clear the file input
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none shadow text-black" // Ensure text color is black
      />
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          id="file-input"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
        />
        <span className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow">
          {fileName || "Upload Image"}
        </span>
      </label>
      <button
        onClick={handleSend}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;


