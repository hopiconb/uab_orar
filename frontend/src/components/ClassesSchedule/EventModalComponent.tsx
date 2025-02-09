import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stack,
  Typography,
  useTheme,  // Import useTheme to access the current theme
} from "@mui/material";

// Define the props for the modal
interface EventModalProps {
  open: boolean;
  handleClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ open, handleClose }) => {
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>("");

  const theme = useTheme();  // Access the current theme

  const handleSave = () => {
    console.log("Eveniment salvat:", {
      eventName,
      eventDate,
      eventStartTime,
      eventEndTime,
    });
    handleClose();
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
        <TextField
          fullWidth
          label="Numele Evenimentului"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          variant="outlined"
          sx={{ mt: 2 }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            label="Selectează Data"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            label="Ora Început"
            type="time"
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ minWidth: "50px", textAlign: "center" }}
          >
            Până la
          </Typography>
          <TextField
            fullWidth
            label="Ora Sfârșit"
            type="time"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Stack>

        <TextField
          fullWidth
          label="Descriere Eveniment"
          multiline
          rows={3}
          margin="normal"
          variant="outlined"
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="error" variant="contained">
          Anulează
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgb(25,118,210)" : "primary.main", 
            color: theme.palette.mode === "dark" ? "white" : "primary.contrastText",
          }}
        >
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
