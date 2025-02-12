import React from 'react';
import { 
  Popover, 
  Box, 
  Typography, 
  TextField, 
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@mui/material';
import { ClassesScheduleEvent } from '../../types/classesSchedule';

interface EventEditPopoverProps {
  event: ClassesScheduleEvent;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSave: (updatedEvent: ClassesScheduleEvent) => void;
  onDelete: (eventId: string) => void;
}

export const EventEditPopover: React.FC<EventEditPopoverProps> = ({
  event,
  anchorEl,
  onClose,
  onSave,
  onDelete
}) => {
  const [editedEvent, setEditedEvent] = React.useState<ClassesScheduleEvent>(event);

  const handleSave = () => {
    onSave(editedEvent);
    onClose();
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <Box sx={{ p: 3, width: 300 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Editează Evenimentul
        </Typography>
        
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Titlu"
            value={editedEvent.title}
            onChange={(e) => setEditedEvent({
              ...editedEvent,
              title: e.target.value
            })}
          />

          <TextField
            fullWidth
            label="Locație"
            value={editedEvent.location}
            onChange={(e) => setEditedEvent({
              ...editedEvent,
              location: e.target.value
            })}
          />

          <TextField
            fullWidth
            label="Profesor"
            value={editedEvent.professor || ''}
            onChange={(e) => setEditedEvent({
              ...editedEvent,
              professor: e.target.value
            })}
          />

          <FormControl fullWidth>
            <InputLabel>Tip</InputLabel>
            <Select
              value={editedEvent.type || ''}
              label="Tip"
              onChange={(e) => setEditedEvent({
                ...editedEvent,
                type: e.target.value as 'curs' | 'seminar' | 'laborator'
              })}
            >
              <MenuItem value="curs">Curs</MenuItem>
              <MenuItem value="seminar">Seminar</MenuItem>
              <MenuItem value="laborator">Laborator</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Interval Orar</InputLabel>
            <Select
              value={editedEvent.timeSlot}
              label="Interval Orar"
              onChange={(e) => setEditedEvent({
                ...editedEvent,
                timeSlot: e.target.value
              })}
            >
              <MenuItem value="08-10">08:00 - 10:00</MenuItem>
              <MenuItem value="10-12">10:00 - 12:00</MenuItem>
              <MenuItem value="12-14">12:00 - 14:00</MenuItem>
              <MenuItem value="14-16">14:00 - 16:00</MenuItem>
              <MenuItem value="16-18">16:00 - 18:00</MenuItem>
              <MenuItem value="18-20">18:00 - 20:00</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Ziua</InputLabel>
            <Select
              value={editedEvent.dayOfWeek}
              label="Ziua"
              onChange={(e) => setEditedEvent({
                ...editedEvent,
                dayOfWeek: Number(e.target.value)
              })}
            >
              <MenuItem value={0}>Luni</MenuItem>
              <MenuItem value={1}>Marți</MenuItem>
              <MenuItem value={2}>Miercuri</MenuItem>
              <MenuItem value={3}>Joi</MenuItem>
              <MenuItem value={4}>Vineri</MenuItem>
							<MenuItem value={5}>Sâmbătă</MenuItem>
							<MenuItem value={6}>Duminică</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 2,
            gap: 1
          }}>
            <Button 
              variant="contained" 
              color="error"
              size="small"
              onClick={handleDelete}
            >
              DELETE
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="text"
                size="small"
                onClick={onClose}
              >
                CANCEL
              </Button>
              <Button 
                variant="contained"
                size="small"
                color="primary"
                onClick={handleSave}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Popover>
  );
};