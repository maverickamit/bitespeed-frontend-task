import React, { useContext } from "react";
import { Text } from "@mantine/core";
import { useState } from "react";
import { ArrowLeft } from "tabler-icons-react";
import { SidePanelContext } from "./dashboard";
import "./messageInputSettings.css";

const MessageInputSettings: React.FC = () => {
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const sidePanelContextValue = useContext(SidePanelContext);

  return (
    <div className="message-input-settings">
      <div className="header">
        <ArrowLeft
          className="left-arrow"
          size={30}
          onClick={() => sidePanelContextValue.setSettingsPanelOpen(false)}
        />
        <Text>Message</Text>
      </div>
      <div className="text-input">
        <textarea value={message} onChange={handleChange} />
      </div>
    </div>
  );
};

export default MessageInputSettings;
