import MessageNode from "./messageNode";

const NodesPanel: React.FC = () => {
  return (
    <div className="sidebar">
      <h4>Nodes Panel</h4>
      <div>
        <MessageNode />
      </div>
    </div>
  );
};

export default NodesPanel;
