import { useDrag } from "react-dnd";
import { Message } from "tabler-icons-react";
import { Text } from "@mantine/core";
import "./messageNode.css";

const MessageNode: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: "text",
  }));

  return (
    <div ref={drag} className="draggable-text-node">
      <div className="message-icon">
        <Message size={30} />
        <Text>Message</Text>
      </div>
    </div>
  );
};

export default MessageNode;
