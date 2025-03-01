// ScheduleHeader.tsx
import React from 'react';
import { Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { WEEK_DAYS } from '../../constants/scheduleConstants';

interface ScheduleHeaderProps {
  ariaLabel?: string;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ ariaLabel = 'Zile ale săptămânii' }) => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[900] 
          : theme.palette.grey[100],
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
      role="row"
      aria-label={ariaLabel}
    >
      <Grid 
        item 
        xs={2} 
        sx={{ 
          p: { xs: 1, sm: 2 },
          textAlign: "center" 
        }}
        role="columnheader"
      >
        <Typography 
          variant={isSmall ? "body2" : "subtitle1"} 
          fontWeight="bold" 
          sx={{ color: theme.palette.text.primary }}
        >
          Ora
        </Typography>
      </Grid>
      {WEEK_DAYS.map((day) => (
        <Grid 
          item 
          xs={1.4} 
          key={day.value} 
          sx={{ 
            p: { xs: 1, sm: 2 },
            textAlign: "center" 
          }}
          role="columnheader"
        >
          <Typography 
            variant={isSmall ? "body2" : "subtitle1"} 
            fontWeight="bold" 
            sx={{ color: theme.palette.text.primary }}
          >
            {isExtraSmall ? day.shortLabel : day.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ScheduleHeader);
