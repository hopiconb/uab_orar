import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBookedSlots, createBookedSlot, clearError, setCustomError } from "../../store/slices/scheduleSlice";
import { TIME_SLOTS, WEEK_DAYS } from "../../constants/scheduleConstants";
import { LoadingButton, DangerButton } from "../common/StyledComponents";
import { handleApiError } from "../../utils/errorHandling";

interface EventModalProps {
  open: boolean;
  handleClose: () => void;
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

  const isTimeSlotBooked = useCallback((dayIndex: number, timeSlotIndex: number) => {
    return bookedSlots.find(
      slot => slot.day === dayIndex && slot.timeSlot === timeSlotIndex
    );
  }, [bookedSlots]);

  const handleDaySelect = useCallback((index: number) => {
    setSelectedDay(index);
    dispatch(clearError());
    if (selectedTimeSlot !== null) {
      const bookedSlot = isTimeSlotBooked(index, selectedTimeSlot);
      if (bookedSlot) {
        dispatch(setCustomError(`Acest interval este deja rezervat de ${bookedSlot.professorName}`));
      }
    }
  }, [dispatch, isTimeSlotBooked, selectedTimeSlot]);
  
  const handleTimeSlotSelect = useCallback((index: number) => {
    dispatch(clearError());
    if (selectedDay !== null) {
      const bookedSlot = isTimeSlotBooked(selectedDay, index);
      if (bookedSlot) {
        dispatch(setCustomError(`Acest interval este deja rezervat de ${bookedSlot.professorName}`));
        return;
      }
    }
    setSelectedTimeSlot(index);
  }, [dispatch, isTimeSlotBooked, selectedDay]);
  
  const handleSave = useCallback(async () => {
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
        handleApiError(err, 'Eroare la salvarea evenimentului');
      }
    }
  }, [eventName, selectedDay, selectedTimeSlot, dispatch, isTimeSlotBooked, handleClose]);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="sm"
      aria-labelledby="event-dialog-title"
    >
      <DialogTitle 
        id="event-dialog-title"
        sx={{ textAlign: "center", pb: 1 }}
      >
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
        <TextField
          fullWidth
          label="Numele Orei"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          variant="outlined"
          sx={{ mt: 2 }}
          disabled={isLoading}
          aria-label="Introduceți numele orei"
          aria-required="true"
          error={!eventName.trim() && error?.includes("numele orei")}
          helperText={!eventName.trim() && error?.includes("numele orei") ? "Acest câmp este obligatoriu" : ""}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Selectează Ziua
        </Typography>
        <Grid container spacing={1} role="radiogroup" aria-label="Zile ale săptămânii">
          {WEEK_DAYS.map((day) => (
            <Grid item xs={12} sm={4} md={3} key={day.value}>
              <Paper
                sx={{
                  p: 1,
                  textAlign: "center",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  bgcolor: selectedDay === day.value ? "primary.main" : "background.paper",
                  color: selectedDay === day.value ? "primary.contrastText" : "text.primary",
                  '&:hover': {
                    bgcolor: selectedDay === day.value 
                      ? "primary.dark"
                      : theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                  transition: 'background-color 0.3s',
                  opacity: isLoading ? 0.7 : 1,
                }}
                elevation={selectedDay === day.value ? 4 : 1}
                onClick={() => !isLoading && handleDaySelect(day.value)}
                role="radio"
                aria-checked={selectedDay === day.value}
                aria-label={day.label}
                tabIndex={isLoading ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    !isLoading && handleDaySelect(day.value);
                  }
                }}
              >
                {day.label}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Selectează Intervalul Orar
        </Typography>
        <Grid container spacing={1} role="radiogroup" aria-label="Intervale orare">
          {TIME_SLOTS.map((slot, index) => {
            const isBooked = selectedDay !== null && Boolean(isTimeSlotBooked(selectedDay, index));
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
                  role="radio"
                  aria-checked={selectedTimeSlot === index}
                  aria-label={slot.label}
                  aria-disabled={isBooked}
                  tabIndex={isBooked || isLoading ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      !isLoading && !isBooked && handleTimeSlotSelect(index);
                    }
                  }}
                >
                  <Typography variant="body1">
                    {slot.label}
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
        <DangerButton 
          onClick={handleClose} 
          disabled={isLoading}
          aria-label="Anulează adăugarea evenimentului"
        >
          Anulează
        </DangerButton>
        <LoadingButton
          onClick={handleSave}
          loading={isLoading}
          variant="contained"
          color="primary"
          disabled={selectedDay === null || selectedTimeSlot === null || error !== null}
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgb(25,118,210)" : "primary.main",
            color: theme.palette.mode === "dark" ? "white" : "primary.contrastText",
          }}
          aria-label="Salvează evenimentul"
        >
          Salvează
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EventModal);