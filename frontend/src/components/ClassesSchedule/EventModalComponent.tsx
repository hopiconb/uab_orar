import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  useTheme,
  Grid,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBookedSlots, createBookedSlot, clearError, setCustomError } from "../../store/slices/scheduleSlice";

interface EventModalProps {
  open: boolean;
  handleClose: () => void;
}

interface TimeSlot {
  start: string;
  end: string;
}


const EventModal: React.FC<EventModalProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const { bookedSlots, isLoading, error } = useAppSelector((state) => state.schedule);
  
  const [eventName, setEventName] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);

  const theme = useTheme();

  useEffect(() => {
    if (open) {
      dispatch(fetchBookedSlots());
    }
    return () => {
      dispatch(clearError());
    };
  }, [open, dispatch]);

  const weekDays = [
    "Luni",
    "Marți",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sâmbătă",
    "Duminică",
  ];

  const timeSlots: TimeSlot[] = [
    { start: "08:00", end: "10:00" },
    { start: "10:00", end: "12:00" },
    { start: "12:00", end: "14:00" },
    { start: "14:00", end: "16:00" },
    { start: "16:00", end: "18:00" },
    { start: "18:00", end: "20:00" },
  ];

  const isTimeSlotBooked = (dayIndex: number, timeSlotIndex: number) => {
    return bookedSlots.find(
      slot => slot.day === dayIndex && slot.timeSlot === timeSlotIndex
    );
  };

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    dispatch(clearError());
    if (selectedTimeSlot !== null) {
      const bookedSlot = isTimeSlotBooked(index, selectedTimeSlot);
      if (bookedSlot) {
        dispatch(setCustomError(`Acest interval este deja rezervat de ${bookedSlot.professorName}`));
      }
    }
  };
  
  const handleTimeSlotSelect = (index: number) => {
    dispatch(clearError());
    if (selectedDay !== null) {
      const bookedSlot = isTimeSlotBooked(selectedDay, index);
      if (bookedSlot) {
        dispatch(setCustomError( `Acest interval este deja rezervat de ${bookedSlot.professorName}`));
        return;
      }
    }
    setSelectedTimeSlot(index);
  };
  
  const handleSave = async () => {
    if (!eventName.trim()) {
      dispatch(setCustomError("Vă rugăm să introduceți numele orei"));
      return;
    }
  
    if (selectedDay === null) {
      dispatch(setCustomError("Vă rugăm să selectați o zi"));
      return;
    }
  
    if (selectedTimeSlot === null) {
      dispatch(setCustomError("Vă rugăm să selectați un interval orar"));
      return;
    }
  
    if (selectedDay !== null && selectedTimeSlot !== null) {
      const bookedSlot = isTimeSlotBooked(selectedDay, selectedTimeSlot);
      if (bookedSlot) {
        dispatch(setCustomError("Acest interval orar este deja rezervat"));
        return;
      }
  
      try {
        await dispatch(createBookedSlot({
          professorName: eventName,
          day: selectedDay,
          timeSlot: selectedTimeSlot,
        })).unwrap();
        
        handleClose();
      } catch (err) {
        console.error('Failed to save:', err);
        // Nu mai trebuie să facem dispatch la setCustomError aici
        // deoarece createBookedSlot.rejected va seta deja eroarea
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        Adaugă Eveniment
      </DialogTitle>
      <DialogContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        )}

        <TextField
          fullWidth
          label="Numele Orei"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          variant="outlined"
          sx={{ mt: 2 }}
          disabled={isLoading}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Selectează Ziua
        </Typography>
        <Grid container spacing={1}>
          {weekDays.map((day, index) => (
            <Grid item xs={12} sm={4} md={3} key={day}>
              <Paper
                sx={{
                  p: 1,
                  textAlign: "center",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  bgcolor: selectedDay === index ? "primary.main" : "background.paper",
                  color: selectedDay === index ? "primary.contrastText" : "text.primary",
                  '&:hover': {
                    bgcolor: selectedDay === index 
                      ? "primary.dark"
                      : theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                  transition: 'background-color 0.3s',
                  opacity: isLoading ? 0.7 : 1,
                }}
                elevation={selectedDay === index ? 4 : 1}
                onClick={() => !isLoading && handleDaySelect(index)}
              >
                {day}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Selectează Intervalul Orar
        </Typography>
        <Grid container spacing={1}>
          {timeSlots.map((slot, index) => {
            const isBooked = selectedDay !== null && isTimeSlotBooked(selectedDay, index);
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    cursor: isBooked || isLoading ? "not-allowed" : "pointer",
                    bgcolor: isBooked 
                      ? "error.light"
                      : selectedTimeSlot === index 
                        ? "primary.main" 
                        : "background.paper",
                    color: (isBooked || selectedTimeSlot === index) 
                      ? "primary.contrastText" 
                      : "text.primary",
                    '&:hover': {
                      bgcolor: isBooked 
                        ? "error.light"
                        : selectedTimeSlot === index 
                          ? "primary.dark"
                          : theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.04)',
                    },
                    transition: 'background-color 0.3s',
                    opacity: isBooked || isLoading ? 0.7 : 1,
                  }}
                  elevation={selectedTimeSlot === index ? 4 : 1}
                  onClick={() => !isLoading && !isBooked && handleTimeSlotSelect(index)}
                >
                  <Typography variant="body1">
                    {slot.start} - {slot.end}
                  </Typography>
                  {isBooked && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                      Rezervat
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={handleClose} 
          color="error" 
          variant="contained"
          disabled={isLoading}
        >
          Anulează
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isLoading || selectedDay === null || selectedTimeSlot === null || error !== null}
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgb(25,118,210)" : "primary.main",
            color: theme.palette.mode === "dark" ? "white" : "primary.contrastText",
          }}
        >
          {isLoading ? 'Se salvează...' : 'Salvează'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;