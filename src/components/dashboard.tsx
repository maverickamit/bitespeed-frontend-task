import { createContext, useState } from "react";
import {
  AppShell,
  Header,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import NodesPanel from "./nodesPanel";
import SettingsPanel from "./settingsPanel.tsx";
import DnDFlow from "./dndFlow.tsx";
interface SidePanelContext {
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: (arg1: boolean) => void;
}

export const SidePanelContext = createContext<SidePanelContext>(
  {} as SidePanelContext
);

export default function Dashboard() {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const theme = useMantineTheme();
  return (
    <SidePanelContext.Provider
      value={{ settingsPanelOpen, setSettingsPanelOpen }}
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
                height: "100%",
                backgroundColor: theme.colors.gray[2],
              }}
            >
              <Text p="md">Flow Builder</Text>
            </div>
          </Header>
        }
      >
        {/* Application goes here */}
        <DnDFlow />
      </AppShell>
    </SidePanelContext.Provider>
  );
}
