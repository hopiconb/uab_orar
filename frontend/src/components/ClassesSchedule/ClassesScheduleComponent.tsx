import React, { useState } from "react";
import { Grid, Typography, Box, Stack, Button, useTheme } from "@mui/material";
import EventModal from "./EventModalComponent";

export const ScheduleTable: React.FC = () => {
  // Intervalele orare
  const timeSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];

  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme(); // Get current theme

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        height: "100vh", // Înălțimea paginii
        padding: 4, // Spațiere față de marginea paginii
      }}
      spacing={10}
    >
      {/* Buton pentru deschiderea modalului */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ mb: 3,
          backgroundColor: theme.palette.mode === "dark" ? "rgb(25,118,210)" : "primary.main", 
          color: theme.palette.mode === "dark" ? "white" : "primary.contrastText",
         }}
      >
        Adaugă Eveniment
      </Button>

      {/* Modalul pentru adăugarea unui eveniment  */}
      <EventModal open={open} handleClose={handleClose} />

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 2, // Spațiu între titlu și tabel
        }}
      >
        Orarul meu
      </Typography>

      <Grid
        container
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper, // Use theme background
          width: "90%",
          maxWidth: "1400px",
          height: "50vh",
        }}
      >
        {/* Header */}
        <Grid
          container
          item
          xs={12}
          sx={{
            backgroundColor: theme.palette.background.default, // Dynamic background for header
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid item xs={2} sx={{ padding: 1, textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Ora
            </Typography>
          </Grid>
          {["Luni", "Marți", "Miercuri", "Joi", "Vineri"].map((day) => (
            <Grid
              item
              xs={2}
              key={day}
              sx={{ padding: 1, textAlign: "center" }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Rows */}
        {timeSlots.map((timeSlot, rowIndex) => (
          <Grid
            container
            item
            xs={12}
            key={rowIndex}
            sx={{
              borderBottom:
                rowIndex < timeSlots.length - 1 ? `1px solid ${theme.palette.divider}` : "none",
            }}
          >
            {/* Interval orar */}
            <Grid
              item
              xs={2}
              sx={{
                padding: 1,
                textAlign: "center",
                backgroundColor: theme.palette.background.paper, // Background for the time column
              }}
            >
              <Typography variant="body2">{timeSlot}</Typography>
            </Grid>
            {/* Cells */}
            {[...Array(5)].map((_, colIndex) => (
              <Grid item xs={2} key={colIndex} sx={{ padding: 1 }}>
                {/* Exemplu de card pentru un curs */}
                {rowIndex === 1 && colIndex === 0 && (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.light, // Light color for events
                      borderRadius: 1,
                      padding: 1,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Arhitectura sistemelor de calcul
                    </Typography>
                    <Typography variant="caption">Corp C - Sala A2</Typography>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
