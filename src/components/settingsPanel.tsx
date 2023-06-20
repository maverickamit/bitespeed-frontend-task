import React from "react";
import MessageInputSettings from "./messageInputSettings";

const SettingsPanel: React.FC = () => {
  return (
    <div className="sidebar">
      <div>
        <MessageInputSettings />
      </div>
    </div>
  );
};

export default SettingsPanel;
