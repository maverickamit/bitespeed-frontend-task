import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";
import { MantineProvider } from "@mantine/core";

const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Dashboard />
    </MantineProvider>
  );
};

export default App;
