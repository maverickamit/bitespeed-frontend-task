import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";
import { MantineProvider } from "@mantine/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <DndProvider backend={HTML5Backend}>
        <Dashboard />
      </DndProvider>
    </MantineProvider>
  );
};

export default App;
