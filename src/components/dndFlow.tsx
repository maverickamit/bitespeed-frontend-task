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
import { SidePanelContext } from "./dashboard";
import { XYCoord } from "react-dnd";
import SendMessageNode from "./sendMessageNode";
import "reactflow/dist/style.css";
import "./dndFlow.css";

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

  const sidePanelContextValue = useContext(SidePanelContext);

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
    sidePanelContextValue.setSettingsPanelOpen(true);
    sidePanelContextValue.setSelectedNode(node);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === sidePanelContextValue.selectedNode?.id) {
          if (sidePanelContextValue.selectedNode)
            node.data = {
              ...node.data,
              label: sidePanelContextValue.selectedNode.data.label,
            };
        }
        return node;
      })
    );
  }, [sidePanelContextValue.selectedNode, setNodes]);

  return (
    <div className="dnd-flow" ref={drop}>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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
            onPaneClick={() =>
              sidePanelContextValue.setSettingsPanelOpen(false)
            }
          >
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DnDFlow;
