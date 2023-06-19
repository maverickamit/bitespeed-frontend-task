import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import "./dndFlow.css";

const initialNodes = [
  {
    id: "1",
    type: "default",
    data: { label: "default node" },
    position: { x: 10, y: 10 },
  },
];

const DndFlow: React.FC = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="dnd-flow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
          >
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DndFlow;
