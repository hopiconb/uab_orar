import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import DvrIcon from "@mui/icons-material/Dvr";
import {
  AppProvider,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import logo from "../../assets/logo.svg";
import { ScheduleTable } from "../ClassesSchedule/ClassesScheduleComponent";
import SidebarFooterAccount from '../AccountComponent/CustomAccountComponent';

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Orar",
    icon: <DashboardIcon />,
  },
  {
    segment: "orarSali",
    title: "Orar-Sali",
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
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      branding={{
        logo: (
          <img
            src={logo}
            alt="UNI Logo"
            style={{
              width: "205px",
              height: "65px",
              maxHeight: "none",
              objectFit: "contain",
              margin: "0 auto",
              marginTop: "-13px",
              marginLeft: "-19px",
            }}
          />
        ),
        title: "",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
        <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: (props) => <SidebarFooterAccount {...props} />
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}