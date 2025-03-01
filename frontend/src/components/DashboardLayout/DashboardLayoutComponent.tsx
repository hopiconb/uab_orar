import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import DvrIcon from "@mui/icons-material/Dvr";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import logo from "../../assets/logo.svg";
import { ScheduleTable } from "../ClassesSchedule/ScheduleTableComponent";
import SidebarFooterAccount from "../AccountComponent/CustomAccountComponent";
import { ClassroomSchedule } from "../ClassroomSchedule/ClassroomScheduleComponent";
import { PDFViewerContainer } from "../common/StyledComponents";

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
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          '@media (max-width: 600px)': {
            width: '240px',
          },
        },
      },
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    if (pathname === "/hartaSalilor") {
      window.open("https://uab.ro/media/Sali%20UAB%202025%20RO%20-%20update%2010.02.2025_1XRXDT3.pdf", "_blank");
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      {pathname === "/dashboard" ? (
        <ScheduleTable />
      ) : pathname === "/orarSali" ? (
        <ClassroomSchedule />
      ) : pathname === "/solaris" ? (
        <PDFViewerContainer>
          <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
            PDF viewer will be implemented here
          </Typography>
        </PDFViewerContainer>
      ) : (
        <Typography>Dashboard content for {pathname}</Typography>
      )}
    </Box>
  );
}

export default function DashboardLayoutComponent() {
  const router = useDemoRouter("/dashboard");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppProvider
      branding={{
        logo: (
          <img
            src={logo}
            alt="UNI Logo"
            style={{
              width: isMobile ? "150px" : "205px",
              height: isMobile ? "50px" : "65px",
              maxHeight: "none",
              objectFit: "contain",
              margin: "0 auto",
              marginTop: isMobile ? "-8px" : "-13px",
              marginLeft: isMobile ? "-10px" : "-19px",
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
          sidebarFooter: (props) => <SidebarFooterAccount {...props} />,
        }}
        sx={{
          '& .MuiToolbar-root': {
            minHeight: { xs: '56px', sm: '64px' },
            px: { xs: 1, sm: 2 },
          },
          '& .MuiDrawer-paper': {
            width: { xs: '240px', sm: '280px' },
          },
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
