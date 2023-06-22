import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Connection,
  ReactFlowInstance,
  Node,
  MarkerType,
  NodeTypes,
} from "reactflow";
import { useDrop } from "react-dnd";
import { AppContext } from "../dashboard/dashboard";
import { XYCoord } from "react-dnd";
import SendMessageNode from "../sendMessageNode/sendMessageNode";
import "reactflow/dist/style.css";
import styles from "./dndFlow.module.css";

const initialNodes = [
  {
    id: "1",
    type: "sendMessage",
    data: { label: "default node" },
    position: { x: 10, y: 10 },
  },
];

const nodeTypes: NodeTypes = {
  sendMessage: SendMessageNode,
};

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [numOfNodes, setNumOfNodes] = useState(1);

  const appContextValue = useContext(AppContext);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => {
        return addEdge(
          { ...params, markerEnd: { type: MarkerType.Arrow } },
          eds
        );
      }),
    [setEdges]
  );

  // checkNodesConnectionStatus is used to check the status of nodes connections.
  //If there are more empty target handles than the allowed supplied value, then checkNodesConnectionStatus
  //returns false. Otherwise it returns true.
  const checkNodesConnectionStatus = (val: number): boolean => {
    //val is the number of empty target handles allowed
    const nodeIds = nodes.map((node) => node.id);
    edges.map((edge) => {
      if (nodeIds.includes(edge.target)) {
        const index = nodeIds.indexOf(edge.target);
        if (index !== -1) {
          nodeIds.splice(index, 1);
        }
      }
    });
    if (nodeIds.length > val) return false;
    return true;
  };

  appContextValue.checkNodesConnectionStatus = checkNodesConnectionStatus;

  const [, drop] = useDrop(
    () => ({
      accept: "message",
      drop: (_, monitor) => {
        const num = numOfNodes + 1;
        const delta = monitor.getSourceClientOffset() as XYCoord;
        const reactFlowBounds =
          reactFlowWrapper.current?.getBoundingClientRect();

        const position = reactFlowInstance.project({
          x: delta.x - reactFlowBounds.left,
          y: delta.y - reactFlowBounds.top,
        });
        setNodes((prevNodes) =>
          prevNodes.concat({
            id: num.toString(10),
            position,
            type: "sendMessage",
            data: { label: "default node " + num.toString(10) },
            draggable: true,
          })
        );
        setNumOfNodes((prevNum) => prevNum + 1);
      },
    }),
    [numOfNodes, reactFlowInstance]
  );

  const handleNodeClick = (_event: React.MouseEvent, node: Node) => {
    appContextValue.setSettingsPanelOpen(true);
    appContextValue.setSelectedNode(node);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === appContextValue.selectedNode?.id) {
          if (appContextValue.selectedNode)
            node.data = {
              ...node.data,
              label: appContextValue.selectedNode.data.label,
            };
        }
        return node;
      })
    );
  }, [appContextValue.selectedNode, setNodes]);

  return (
    <div className={styles["dnd-flow"]} ref={drop}>
      <div className={styles["reactflow-wrapper"]} ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick} //Displays settings panel on clicking a node
            onPaneClick={() => appContextValue.setSettingsPanelOpen(false)}
          >
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DnDFlow;
