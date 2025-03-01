import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Grid, Box, useTheme, useMediaQuery, Typography, Paper, Tabs, Tab } from "@mui/material";
import EventModal from "./EventModalComponent";
import { ClassesScheduleEvent } from "../../types/classesSchedule";
import { mockScheduleEvents } from "../../mocks/schedule.mocks";
import { EventEditPopover } from "./EventEditPopoverComponent";
import ScheduleSelectors from "./ScheduleSelectorsComponent";
import { ScheduleFilters } from "../../types/scheduleSelectors";
import { TIME_SLOTS, WEEK_DAYS } from "../../constants/scheduleConstants";
import { ContentContainer, ResponsivePaper } from "../common/StyledComponents";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleRow from "./ScheduleRow";
import ScheduleActions from "./ScheduleActions";
import { handleApiError } from "../../utils/errorHandling";

export const ScheduleTable: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [scheduleEvents, setScheduleEvents] = useState<ClassesScheduleEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClassesScheduleEvent | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly');
  const [selectedDay, setSelectedDay] = useState<number>(0); 
  const theme = useTheme();
  
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("sm")); 
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  const [activeFilters, setActiveFilters] = useState<ScheduleFilters>({
    facultyId: '',
    specializationId: '',
    yearId: '',
    groupId: '',
    year: 0
  });

  const timeSlots = useMemo(() => 
    TIME_SLOTS.map(slot => slot.value),
    []
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setScheduleEvents(mockScheduleEvents);
      } catch (error) {
        handleApiError(error, 'Eroare la încărcarea orarului');
      }
    };

    fetchSchedule();
  }, [activeFilters]);

  const handleFiltersChange = useCallback((filters: ScheduleFilters) => {
    setActiveFilters(filters);
  }, []);

  const getEventForSlot = useCallback((timeSlot: string, dayIndex: number) => {
    return scheduleEvents.find(
      event => event.timeSlot === timeSlot && event.dayOfWeek === dayIndex
    );
  }, [scheduleEvents]);

  const handleEventClick = useCallback((event: ClassesScheduleEvent, element: HTMLElement) => {
    setSelectedEvent(event);
    setAnchorEl(element);
  }, []);

  const handleClosePopover = useCallback(() => {
    setSelectedEvent(null);
    setAnchorEl(null);
  }, []);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSaveEvent = useCallback((updatedEvent: ClassesScheduleEvent) => {
    setScheduleEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }, []);

  const handleDeleteEvent = useCallback((eventId: string) => {
    setScheduleEvents(prevEvents => 
      prevEvents.filter(event => event.id !== eventId)
    );
  }, []);

  const handleViewModeChange = useCallback((mode: 'daily' | 'weekly') => {
    setViewMode(mode);
  }, []);

  const handleDayChange = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  const MobileDailyScheduleView = () => (
    <Box sx={{ mt: 2 }}>
      <Tabs
        value={selectedDay}
        onChange={(_, newValue) => handleDayChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Zile ale săptămânii"
        sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        {WEEK_DAYS.map((day) => (
          <Tab key={day.value} label={day.label} value={day.value} />
        ))}
      </Tabs>
      
      {timeSlots.map((timeSlot) => {
        const event = getEventForSlot(timeSlot, selectedDay);
        return (
          <Box key={timeSlot} sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              sx={{ 
                mb: 1, 
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
                p: 1,
                borderRadius: 1
              }}
            >
              {timeSlot.replace('-', ':00 - ')}:00
            </Typography>
            
            {event ? (
              <Paper
                sx={{
                  p: 1.5,
                  backgroundColor: event.color || theme.palette.primary.light,
                  borderLeft: `4px solid ${event.color || theme.palette.primary.main}`,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[2],
                  }
                }}
                onClick={(e) => handleEventClick(event, e.currentTarget)}
              >
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" display="block">
                  {event.location} {event.professor ? `• ${event.professor}` : ''}
                </Typography>
              </Paper>
            ) : (
              <Paper
                sx={{
                  p: 1.5,
                  backgroundColor: theme.palette.background.paper,
                  borderLeft: `4px solid ${theme.palette.divider}`,
                  opacity: 0.7
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Niciun eveniment programat
                </Typography>
              </Paper>
            )}
          </Box>
        );
      })}
    </Box>
  );

  const MobileWeeklyScheduleView = () => (
    <Box sx={{ mt: 2 }}>
      {timeSlots.map((timeSlot) => (
        <Box key={timeSlot} sx={{ mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            fontWeight="bold" 
            sx={{ 
              mb: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
              p: 1,
              borderRadius: 1
            }}
          >
            {timeSlot.replace('-', ':00 - ')}:00
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {WEEK_DAYS.map((day) => {
              const event = getEventForSlot(timeSlot, day.value);
              if (!event) return null;
              
              return (
                <Paper
                  key={`${timeSlot}-${day.value}`}
                  sx={{
                    p: 1.5,
                    backgroundColor: event.color || theme.palette.primary.light,
                    borderLeft: `4px solid ${event.color || theme.palette.primary.main}`,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[2],
                    }
                  }}
                  onClick={(e) => handleEventClick(event, e.currentTarget)}
                >
                  <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {day.label}: {event.title}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {event.location} {event.professor ? `• ${event.professor}` : ''}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <ContentContainer>
      <ScheduleActions onAddEvent={handleOpenModal} />

      <Box sx={{ 
        mb: { xs: 2, sm: 3 },
        width: '100%'
      }}>
        <ScheduleSelectors onFiltersChange={handleFiltersChange} />
      </Box>

      {isMobile && (
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={viewMode}
            onChange={(_, newValue) => handleViewModeChange(newValue)}
            aria-label="Mod de vizualizare"
            variant="fullWidth"
          >
            <Tab label="Săptămânal" value="weekly" />
            <Tab label="Zilnic" value="daily" />
          </Tabs>
        </Box>
      )}

      {isMobile ? (
        <ResponsivePaper>
          {viewMode === 'daily' ? <MobileDailyScheduleView /> : <MobileWeeklyScheduleView />}
        </ResponsivePaper>
      ) : (
        <Box sx={{ 
          overflowX: "auto",
          '& ::-webkit-scrollbar': {
            height: '8px',
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[300],
            borderRadius: '4px',
          }
        }}
        role="grid"
        aria-label="Orar săptămânal"
        >
          <Grid
            container
            sx={{
              width: "100%",
              minWidth: {
                xs: "800px", 
                md: "100%"   
              },
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <ScheduleHeader />
            
            {timeSlots.map((timeSlot, rowIndex) => (
              <ScheduleRow
                key={timeSlot}
                timeSlot={timeSlot}
                rowIndex={rowIndex}
                totalRows={timeSlots.length}
                getEventForSlot={getEventForSlot}
                onEventClick={handleEventClick}
              />
            ))}
          </Grid>
        </Box>
      )}

      <EventModal open={open} handleClose={handleCloseModal} />

      {selectedEvent && (
        <EventEditPopover
          event={selectedEvent}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </ContentContainer>
  );
};

export default React.memo(ScheduleTable);