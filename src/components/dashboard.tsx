import {
  AppShell,
  Header,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";

export default function Dashboard() {
  const theme = useMantineTheme();
  return (
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
    </AppShell>
  );
}
