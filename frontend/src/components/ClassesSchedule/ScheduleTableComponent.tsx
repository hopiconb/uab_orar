import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Stack, Button, useTheme, useMediaQuery } from "@mui/material";
import EventModal from "./EventModalComponent";
import { ClassesScheduleEvent } from "../../types/classesSchedule";
import { mockScheduleEvents } from "../../mocks/schedule.mocks";
import { EventEditPopover } from "./EventEditPopoverComponent";
import ScheduleSelectors from "./ScheduleSelectorsComponent";
import { ScheduleFilters } from "../../types/scheduleSelectors";

export const ScheduleTable: React.FC = () => {
  const timeSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const [open, setOpen] = useState<boolean>(false);
  const [scheduleEvents, setScheduleEvents] = useState<ClassesScheduleEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClassesScheduleEvent | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  
  // Breakpoints pentru responsivitate
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isSmall = useMediaQuery(theme.breakpoints.down("md")); // < 900px

  const [activeFilters, setActiveFilters] = useState<ScheduleFilters>({
    facultyId: '',
    specializationId: '',
    yearId: '',
    groupId: '',
    year: 0
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setScheduleEvents(mockScheduleEvents);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [activeFilters]);

  const handleFiltersChange = (filters: ScheduleFilters) => {
    setActiveFilters(filters);
  };

  const getEventForSlot = (timeSlot: string, dayIndex: number) => {
    return scheduleEvents.find(
      event => event.timeSlot === timeSlot && event.dayOfWeek === dayIndex
    );
  };

  const handleEventClick = (event: ClassesScheduleEvent, element: HTMLElement) => {
    setSelectedEvent(event);
    setAnchorEl(element);
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
    setAnchorEl(null);
  };

  const handleSaveEvent = (updatedEvent: ClassesScheduleEvent) => {
    setScheduleEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    setScheduleEvents(prevEvents => 
      prevEvents.filter(event => event.id !== eventId)
    );
  };

  return (
    <Box sx={{ 
      p: { 
        xs: 1, // padding mai mic pe mobile
        sm: 2, // padding mediu pe tablete
        md: 4  // padding normal pe desktop
      }, 
      width: '100%', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      backgroundColor: theme.palette.background.default 
    }}>
      {/* Header responsiv */}
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
          Orarul meu
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            }
          }}
        >
          Adaugă Eveniment
        </Button>
      </Stack>

      {/* Selectoare verticale pe toate dispozitivele */}
      <Box sx={{ 
        mb: { xs: 2, sm: 3 },
        '& .MuiFormControl-root': {
          width: '100%', // Selectoarele ocupă întreaga lățime
          mb: 1 // Spațiu între selectoare
        }
      }}>
        <ScheduleSelectors onFiltersChange={handleFiltersChange} />
      </Box>

      {/* Tabel responsiv */}
      <Box sx={{ 
        overflowX: "auto",
        '& ::-webkit-scrollbar': {
          height: '8px',
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[300],
          borderRadius: '4px',
        }
      }}>
        <Grid
          container
          sx={{
            width: "100%",
            minWidth: {
              xs: "800px", // Width minim pe mobile
              md: "100%"   // Width normal pe desktop
            },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Antet responsiv */}
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
          >
            <Grid 
              item 
              xs={2} 
              sx={{ 
                p: { xs: 1, sm: 2 },
                textAlign: "center" 
              }}
            >
              <Typography 
                variant={isSmall ? "body2" : "subtitle1"} 
                fontWeight="bold" 
                sx={{ color: theme.palette.text.primary }}
              >
                Ora
              </Typography>
            </Grid>
            {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"].map((day) => (
              <Grid 
                item 
                xs={1.4} 
                key={day} 
                sx={{ 
                  p: { xs: 1, sm: 2 },
                  textAlign: "center" 
                }}
              >
                <Typography 
                  variant={isSmall ? "body2" : "subtitle1"} 
                  fontWeight="bold" 
                  sx={{ color: theme.palette.text.primary }}
                >
                  {isExtraSmall ? day.substring(0, 3) : day}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Rânduri responsive */}
          {timeSlots.map((timeSlot, rowIndex) => (
            <Grid
              container
              item
              xs={12}
              key={timeSlot}
              sx={{
                borderBottom: rowIndex < timeSlots.length - 1 
                  ? `1px solid ${theme.palette.divider}` 
                  : "none",
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <Grid
                item
                xs={2}
                sx={{
                  p: { xs: 1, sm: 2 },
                  textAlign: "center",
                  borderRight: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography 
                  variant={isSmall ? "caption" : "body2"} 
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {timeSlot.replace('-', ':00 - ')}:00
                </Typography>
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
                        : "none" 
                    }}
                  >
                    {event && (
                      <Box
                        onClick={(e) => handleEventClick(event, e.currentTarget)}
                        sx={{
                          backgroundColor: event.color || theme.palette.primary.light,
                          borderRadius: 1,
                          p: { xs: 0.5, sm: 1.5 },
                          borderLeft: `4px solid ${event.color || theme.palette.primary.main}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[2],
                          },
                        }}
                      >
                        <Typography 
                          variant={isSmall ? "caption" : "body2"} 
                          fontWeight="bold" 
                          sx={{ 
                            color: theme.palette.getContrastText(event.color || theme.palette.primary.main),
                            display: '-webkit-box',
                            WebkitLineClamp: isExtraSmall ? 1 : 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {event.title}
                        </Typography>
                        {!isExtraSmall && (
                          <>
                            <Typography 
                              variant="caption" 
                              display="block" 
                              sx={{ 
                                mt: 0.5,
                                color: theme.palette.getContrastText(event.color || theme.palette.primary.main) 
                              }}
                            >
                              {event.location}
                            </Typography>
                            {event.professor && (
                              <Typography 
                                variant="caption" 
                                display="block" 
                                sx={{ 
                                  mt: 0.5,
                                  color: theme.palette.getContrastText(event.color || theme.palette.primary.main) 
                                }}
                              >
                                {event.professor}
                              </Typography>
                            )}
                          </>
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            display: isExtraSmall ? 'none' : 'inline-block',
                            mt: 1,
                            backgroundColor: event.color || theme.palette.primary.main,
                            color: theme.palette.getContrastText(event.color || theme.palette.primary.main),
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            textTransform: 'capitalize'
                          }}
                        >
                          {event.type || 'curs'}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Box>

      <EventModal open={open} handleClose={() => setOpen(false)} />

      {selectedEvent && (
        <EventEditPopover
          event={selectedEvent}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </Box>
  );
};

export default ScheduleTable;