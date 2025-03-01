// ScheduleActions.tsx
import React from 'react';
import { Stack, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { PrimaryButton } from '../common/StyledComponents';

interface ScheduleActionsProps {
  onAddEvent: () => void;
  title?: string;
}

const ScheduleActions: React.FC<ScheduleActionsProps> = ({ 
  onAddEvent, 
  title = 'Orarul meu' 
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      justifyContent="space-between" 
      alignItems={{ xs: 'flex-start', sm: 'center' }} 
      sx={{ mb: { xs: 2, sm: 3 } }}
    >
      <Typography 
        variant={isSmall ? "h5" : "h4"} 
        sx={{ 
          fontWeight: "bold",
          mb: { xs: 1, sm: 0 }
        }}
      >
        {title}
      </Typography>
      <PrimaryButton
        onClick={onAddEvent}
        size={isExtraSmall ? "small" : "medium"}
        sx={{
          width: { xs: '100%', sm: 'auto' },
        }}
        aria-label="Adaugă eveniment în orar"
      >
        Adaugă Eveniment
      </PrimaryButton>
    </Stack>
  );
};

export default React.memo(ScheduleActions);
