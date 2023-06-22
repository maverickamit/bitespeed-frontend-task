import React, { useContext, useEffect } from "react";
import { Text } from "@mantine/core";
import { useState } from "react";
import { ArrowLeft } from "tabler-icons-react";
import { AppContext } from "./dashboard";
import "./messageInputSettings.css";

const MessageInputSettings: React.FC = () => {
  const appContextValue = useContext(AppContext);
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (appContextValue.selectedNode) {
      appContextValue.setSelectedNode({
        ...appContextValue.selectedNode,
        data: { label: e.target.value },
      });
    }
  };
  //Whenever the value of appContextValue changes, message is updated
  useEffect(() => {
    setMessage(appContextValue.selectedNode?.data.label);
  }, [appContextValue]);

  return (
    <div className="message-input-settings">
      <div className="header">
        <ArrowLeft
          className="left-arrow"
          size={30}
          onClick={() => appContextValue.setSettingsPanelOpen(false)}
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
