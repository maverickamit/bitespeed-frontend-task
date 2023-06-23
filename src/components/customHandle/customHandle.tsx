import { useMemo } from "react";
import {
  Edge,
  getConnectedEdges,
  Handle,
  HandleProps,
  NodeInternals,
  useNodeId,
  useStore,
} from "reactflow";

export interface SelectorsProps {
  nodeInternals?: NodeInternals;
  edges?: Edge[];
}
export interface CustomHandleProps
  extends Pick<HandleProps, Exclude<keyof HandleProps, "isConnectable">> {
  isConnectable?: boolean | number;
}

const selector = (s: SelectorsProps) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

//CustomHandle component is used to create a customized handle for sendMessageNode
const CustomHandle = (props: CustomHandleProps) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();
  //isHandleConnectable function is used to determine if the custom handle is connectable.
  //It returns true if number of connections is less than specified allowable number of connections.
  const isHandleConnectable = useMemo(() => {
    if (typeof props.isConnectable === "number") {
      let sourceConnection = 0;
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);
      connectedEdges.forEach((edge) => {
        if (edge.source === nodeId) {
          sourceConnection++;
        }
      });
      return sourceConnection < props.isConnectable;
    }

    return props.isConnectable;
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default CustomHandle;
