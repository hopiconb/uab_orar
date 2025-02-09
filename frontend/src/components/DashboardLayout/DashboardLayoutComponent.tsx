import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import DvrIcon from "@mui/icons-material/Dvr";
import {
  AppProvider,
  // type Session,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import logo from "../../assets/logo.svg";
import { ScheduleTable } from "../ClassesSchedule/ClassesScheduleComponent";

const NAVIGATION: Navigation = [
  {
    segment: "Home",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "dashboard",
    title: "Orar",
    icon: <DashboardIcon />,
  },
  {
    segment: "orarSali",
    title: "Orar Sali",
    icon: <DashboardIcon />,
  },
  {
    segment: "hartaSalilor",
    title: "Harta Salilor",
    icon: <MapIcon />,
  },
  { kind: "divider" },
  {
    segment: "solaris",
    title: "Solaris",
    icon: <DvrIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname === "/dashboard" ? (
        <ScheduleTable />
      ) : (
        <Typography>Dashboard content for {pathname}</Typography>
      )}
    </Box>
  );
}

export default function DashboardLayoutComponent() {
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      branding={{
        logo: (
          <img
            src={logo}
            alt="UNI Logo"
            style={{
              width: "205px",
              height: "73px",
              maxHeight: "none",
              marginTop: "-12px",
              marginLeft: "-5px",
            }}
          />
        ),
        title: "",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
