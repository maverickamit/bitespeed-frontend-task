import { Button } from "@mantine/core";

const SaveButton: React.FC = () => {
  return (
    <div className="save-button">
      <Button type="submit" variant="outline">
        Save Changes
      </Button>
    </div>
  );
};

export default SaveButton;
