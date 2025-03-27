import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Stack, Button, useTheme } from "@mui/material";
import EventModal from "./EventModalComponent";
import { ClassesScheduleEvent } from "../../types/classesSchedule";
import { mockScheduleEvents } from "../../mocks/schedule.mocks";
import { EventEditPopover } from "./EventEditPopoverComponent";

export const ScheduleTable: React.FC = () => {
  const timeSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const [open, setOpen] = useState<boolean>(false);
  const [scheduleEvents, setScheduleEvents] = useState<ClassesScheduleEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClassesScheduleEvent | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();

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
  }, []);

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

  // Funcție pentru a calcula culoarea de fundal mai deschisă
  const getLightColor = (color: string) => {
    return color + '33';
  };

  return (
    <Box sx={{ p: 4, width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Orarul meu
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            }
          }}
        >
          Adaugă Eveniment
        </Button>
      </Stack>

      <Grid
        container
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          width: "100%",
        }}
      >

        <Grid
          container
          item
          xs={12}
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid item xs={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Ora
            </Typography>
          </Grid>
          {["Luni", "Marți", "Miercuri", "Joi", "Vineri"].map((day) => (
            <Grid item xs={2} key={day} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>


        {timeSlots.map((timeSlot, rowIndex) => (
          <Grid
            container
            item
            xs={12}
            key={timeSlot}
            sx={{
              borderBottom: rowIndex < timeSlots.length - 1 ? `1px solid ${theme.palette.divider}` : "none",
              '&:hover': {
                backgroundColor: theme.palette.grey[50],
              }
            }}
          >
            <Grid
              item
              xs={2}
              sx={{
                p: 2,
                textAlign: "center",
                borderRight: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {timeSlot.replace('-', ':00 - ')}:00
              </Typography>
            </Grid>
            {[...Array(5)].map((_, dayIndex) => {
              const event = getEventForSlot(timeSlot, dayIndex);

              return (
                <Grid item xs={2} key={dayIndex} sx={{ p: 1 }}>
                  {event && (
                    <Box
                      onClick={(e) => handleEventClick(event, e.currentTarget)}
                      sx={{
                        backgroundColor: event.color ? getLightColor(event.color) : theme.palette.primary.light,
                        borderRadius: 1,
                        p: 1.5,
                        borderLeft: `4px solid ${event.color || theme.palette.primary.main}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: event.color || theme.palette.primary.main }}
                      >
                        {event.title}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                        {event.location}
                      </Typography>
                      {event.professor && (
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                          {event.professor}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'inline-block',
                          mt: 1,
                          backgroundColor: event.color || theme.palette.primary.main,
                          color: 'white',
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
