import React, { useContext, useEffect } from "react";
import { Text } from "@mantine/core";
import { useState } from "react";
import { ArrowLeft } from "tabler-icons-react";
import { AppContext } from "../dashboard/dashboard";
import styles from "./messageInputSettings.module.css";

//MessageInputSettings is used on settings panel to help edit the data label of user selected node
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
  //This is required to display updated message when a different node is selected after the current one
  useEffect(() => {
    setMessage(appContextValue.selectedNode?.data.label);
  }, [appContextValue]);

  return (
    <div className={styles["message-input-settings"]}>
      <div className={styles["header"]}>
        <ArrowLeft
          className={styles["left-arrow"]}
          size={30}
          onClick={() => appContextValue.setSettingsPanelOpen(false)}
        />
        <Text>Message</Text>
      </div>
      <div className={styles["text-input"]}>
        <textarea value={message} onChange={handleChange} />
      </div>
    </div>
  );
};

export default MessageInputSettings;
