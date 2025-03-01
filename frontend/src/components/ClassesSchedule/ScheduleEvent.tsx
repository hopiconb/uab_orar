import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Tooltip, Paper } from '@mui/material';
import { ClassesScheduleEvent } from '../../types/classesSchedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

interface ScheduleEventProps {
  event: ClassesScheduleEvent;
  onClick: (event: ClassesScheduleEvent, element: HTMLElement) => void;
}

const ScheduleEvent: React.FC<ScheduleEventProps> = ({ event, onClick }) => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const titleVariant = isExtraSmall ? 'caption' : isSmall ? 'body2' : 'body1';
  const detailsVariant = isExtraSmall ? 'caption' : 'caption';

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const titleMaxLength = isExtraSmall ? 12 : isSmall ? 20 : 30;
  const locationMaxLength = isExtraSmall ? 10 : isSmall ? 15 : 20;
  const professorMaxLength = isExtraSmall ? 10 : isSmall ? 15 : 20;

  const truncatedTitle = truncateText(event.title, titleMaxLength);
  const truncatedLocation = truncateText(event.location, locationMaxLength);
  const truncatedProfessor = event.professor ? truncateText(event.professor, professorMaxLength) : '';

  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <Typography variant="body1" fontWeight="bold">{event.title}</Typography>
      <Typography variant="body2">
        <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        {event.location}
      </Typography>
      {event.professor && (
        <Typography variant="body2">
          <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          {event.professor}
        </Typography>
      )}
      <Typography variant="body2">Tip: {event.type}</Typography>
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} placement="top" arrow>
      <Paper
        elevation={1}
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: event.color || theme.palette.primary.light,
          borderLeft: `4px solid ${event.color ? theme.palette.getContrastText(event.color) : theme.palette.primary.dark}`,
          p: isExtraSmall ? 0.5 : 1,
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[3],
          },
        }}
        onClick={(e) => onClick(event, e.currentTarget)}
      >
        <Typography 
          variant={titleVariant} 
          fontWeight="bold" 
          sx={{ 
            mb: 0.5,
            color: theme.palette.getContrastText(event.color || theme.palette.primary.light),
            textAlign: 'center'
          }}
        >
          {truncatedTitle}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.25
        }}>
          {event.location && (
            <Typography 
              variant={detailsVariant} 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.getContrastText(event.color || theme.palette.primary.light),
                opacity: 0.9
              }}
            >
              <LocationOnIcon fontSize="inherit" sx={{ mr: 0.25 }} />
              {truncatedLocation}
            </Typography>
          )}
          
          {truncatedProfessor && (
            <Typography 
              variant={detailsVariant} 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.getContrastText(event.color || theme.palette.primary.light),
                opacity: 0.9
              }}
            >
              <PersonIcon fontSize="inherit" sx={{ mr: 0.25 }} />
              {truncatedProfessor}
            </Typography>
          )}
        </Box>
      </Paper>
    </Tooltip>
  );
};

export default React.memo(ScheduleEvent);
