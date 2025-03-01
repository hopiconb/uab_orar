// StyledComponents.tsx
import React from 'react';
import { styled } from '@mui/system';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  FormControl,
  CircularProgress
} from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';

// Common container styles
export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1),
  },
}));

// Card with hover effect
export const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: Array.isArray(theme.shadows) ? theme.shadows[4] : '0px 4px 10px rgba(0, 0, 0, 0.15)',
  },
}));

// Primary button with consistent styling
export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 1.5),
    fontSize: '0.875rem',
  },
}));

// Secondary button with consistent styling
export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 1.5),
    fontSize: '0.875rem',
  },
}));

// Danger button with consistent styling
export const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 1.5),
    fontSize: '0.875rem',
  },
}));

// Section title with consistent styling
export const SectionTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
    marginBottom: theme.spacing(1.5),
  },
}));

// Card for schedule events
export const ScheduleEventCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: Array.isArray(theme.shadows) ? theme.shadows[2] : '0px 2px 4px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
  },
}));

// Form container with consistent styling
export const FormWrapper = styled(FormControl)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: Array.isArray(theme.shadows) ? theme.shadows[1] : '0px 1px 2px rgba(0, 0, 0, 0.15)',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    gap: theme.spacing(1.5),
  },
}));

// Loading button component with spinner
interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  [key: string]: any; // For other Button props
}

export const LoadingButton = React.memo(({ loading, children, ...props }: LoadingButtonProps) => (
  <Button
    disabled={loading}
    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
    {...props}
  >
    {loading ? 'Se încarcă...' : children}
  </Button>
));

// Responsive grid container
export const ResponsiveGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: theme.spacing(1.5),
  },
}));

// Page section with consistent styling
export const PageSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

// Responsive Paper component
export const ResponsivePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: Array.isArray(theme.shadows) ? theme.shadows[1] : '0px 1px 3px rgba(0, 0, 0, 0.12)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

// PDF Viewer Container
export const PDFViewerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 200px)',
  minHeight: '500px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: 'calc(100vh - 150px)',
    minHeight: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 120px)',
    minHeight: '300px',
  },
}));
