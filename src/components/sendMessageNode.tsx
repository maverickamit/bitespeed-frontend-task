import { Text } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { BrandWhatsapp, Message } from "tabler-icons-react";
import "./sendMessageNode.css";
const SendMessageNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className="send-message">
        <div className="send-message-header">
          <Message size={20} />
          <Text size={15}>Send Message</Text>
          <BrandWhatsapp size={20} />
        </div>
        <Text size={20} className="send-message-label">
          {data.label}
        </Text>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default SendMessageNode;
