import React from 'react';
import { Grid, Typography, useTheme, useMediaQuery, Tooltip } from '@mui/material';
import { ClassesScheduleEvent } from '../../types/classesSchedule';
import ScheduleEvent from './ScheduleEvent';

interface ScheduleRowProps {
  timeSlot: string;
  rowIndex: number;
  totalRows: number;
  getEventForSlot: (timeSlot: string, dayIndex: number) => ClassesScheduleEvent | undefined;
  onEventClick: (event: ClassesScheduleEvent, element: HTMLElement) => void;
}

const ScheduleRow: React.FC<ScheduleRowProps> = ({ 
  timeSlot, 
  rowIndex, 
  totalRows, 
  getEventForSlot, 
  onEventClick 
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        borderBottom: rowIndex < totalRows - 1 
          ? `1px solid ${theme.palette.divider}` 
          : "none",
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        minHeight: isExtraSmall ? '60px' : isSmall ? '80px' : '100px'
      }}
      role="row"
      aria-label={`Interval orar ${timeSlot.replace('-', ':00 - ')}:00`}
    >
      <Grid
        item
        xs={2}
        sx={{
          p: { xs: 1, sm: 2 },
          textAlign: "center",
          borderRight: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        role="rowheader"
      >
        <Tooltip title={`${timeSlot.replace('-', ':00 - ')}:00`} placement="top">
          <Typography 
            variant={isSmall ? "caption" : "body2"} 
            sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 'medium'
            }}
          >
            {timeSlot.replace('-', ':00 - ')}:00
          </Typography>
        </Tooltip>
      </Grid>
      {[...Array(7)].map((_, dayIndex) => {
        const event = getEventForSlot(timeSlot, dayIndex);
        return (
          <Grid 
            item 
            xs={1.4} 
            key={dayIndex} 
            sx={{ 
              p: { xs: 0.5, sm: 1 },
              borderRight: dayIndex < 6 
                ? `1px solid ${theme.palette.divider}` 
                : "none",
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            role="gridcell"
          >
            {event && (
              <ScheduleEvent event={event} onClick={onEventClick} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(ScheduleRow);
