import { createContext, useState } from "react";
import {
  AppShell,
  Header,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import { Node } from "reactflow";
import NodesPanel from "../nodesPanel/nodesPanel.tsx";
import SettingsPanel from "../settingsPanel/settingsPanel.tsx";
import DnDFlow from "../dndFlow/dndFlow.tsx";
import SaveButton from "../saveButton/saveButton.tsx";
interface AppContext {
  settingsPanelOpen: boolean; //indicates if the settings panel is visible on sidebar
  selectedNode: Node | null; //holds the value of the node selected by the user on mouseclick
  setSettingsPanelOpen: (arg1: boolean) => void;
  setSelectedNode: (arg1: Node) => void;
  checkNodesConnectionStatus?: (arg1: number) => boolean; //helps to check if the flow is allowed to be saved
}
//AppContext holds all the necessary values/functions that are required across different components
//in the application. It's using context api.
export const AppContext = createContext<AppContext>({} as AppContext);

//Dashboard component is used to contain different components inside it and for giving the
//general layout of the web application.

export default function Dashboard() {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const theme = useMantineTheme();
  return (
    <AppContext.Provider
      value={{
        settingsPanelOpen,
        selectedNode,
        setSettingsPanelOpen,
        setSelectedNode,
      }}
    >
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              {/* Application sidebar */}
              {settingsPanelOpen ? <SettingsPanel /> : <NodesPanel />}
            </Aside>
          </MediaQuery>
        }
        header={
          <Header height={{ base: 50, md: 70 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                backgroundColor: theme.colors.gray[2],
                padding: "0 100px",
              }}
            >
              <Text p="md">Flow Builder</Text>
              <SaveButton />
            </div>
          </Header>
        }
      >
        {/* Application goes here */}
        <DnDFlow />
      </AppShell>
    </AppContext.Provider>
  );
}
