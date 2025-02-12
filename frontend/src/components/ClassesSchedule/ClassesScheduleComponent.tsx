// src/components/ScheduleTable.tsx
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
        // Simulăm un delay de rețea
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

  // Funcții pentru gestionarea popover-ului
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
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        height: "100vh",
        padding: 4,
      }}
      spacing={10}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          mb: 3,
          backgroundColor: theme.palette.mode === "dark" ? "rgb(25,118,210)" : "primary.main",
          color: theme.palette.mode === "dark" ? "white" : "primary.contrastText",
        }}
      >
        Adaugă Eveniment
      </Button>

      <EventModal open={open} handleClose={() => setOpen(false)} />

      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Orarul meu
      </Typography>

      <Grid
        container
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          width: "90%",
          maxWidth: "1400px",
          height: "50vh",
        }}
      >
        <Grid
          container
          item
          xs={12}
          sx={{
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid item xs={2} sx={{ padding: 1, textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Ora
            </Typography>
          </Grid>
          {["Luni", "Marți", "Miercuri", "Joi", "Vineri"].map((day) => (
            <Grid item xs={2} key={day} sx={{ padding: 1, textAlign: "center" }}>
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
              borderBottom:
                rowIndex < timeSlots.length - 1
                  ? `1px solid ${theme.palette.divider}`
                  : "none",
            }}
          >
            <Grid
              item
              xs={2}
              sx={{
                padding: 1,
                textAlign: "center",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="body2">{timeSlot}</Typography>
            </Grid>
            {[...Array(5)].map((_, dayIndex) => {
              const event = getEventForSlot(timeSlot, dayIndex);
              return (
                <Grid item xs={2} key={dayIndex} sx={{ padding: 1 }}>
                  {event && (
                    <Box
                      onClick={(e) => handleEventClick(event, e.currentTarget)}
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: 1,
                        padding: 1,
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.9,
                          boxShadow: 1,
                        },
                      }}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        {event.title}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {event.location}
                      </Typography>
                      {event.professor && (
                        <Typography variant="caption" display="block">
                          {event.professor}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>

      {selectedEvent && (
        <EventEditPopover
          event={selectedEvent}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </Stack>
  );
};