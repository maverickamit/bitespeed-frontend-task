import React from "react";
import { Text } from "@mantine/core";
import "./messageInputSettings.css";
import { useState } from "react";

const MessageInputSettings: React.FC = () => {
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="message-input-settings">
      <Text className="header">Message</Text>
      <div className="text-input">
        <textarea value={message} onChange={handleChange} />
      </div>
    </div>
  );
};

export default MessageInputSettings;
