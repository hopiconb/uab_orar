import React, { useState, useCallback } from 'react';
import { 
  Popover, 
  Box, 
  Typography, 
  TextField, 
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@mui/material';
import { ClassesScheduleEvent } from '../../types/classesSchedule';
import { TIME_SLOTS, WEEK_DAYS, EVENT_TYPES } from '../../constants/scheduleConstants';
import { DangerButton, PrimaryButton, SecondaryButton } from '../common/StyledComponents';

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
  const [editedEvent, setEditedEvent] = useState<ClassesScheduleEvent>(event);

  const handleInputChange = useCallback((field: keyof ClassesScheduleEvent, value: any) => {
    setEditedEvent(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = useCallback(() => {
    onSave(editedEvent);
    onClose();
  }, [editedEvent, onSave, onClose]);

  const handleDelete = useCallback(() => {
    onDelete(event.id);
    onClose();
  }, [event.id, onDelete, onClose]);

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
      aria-labelledby="event-edit-title"
    >
      <Box sx={{ p: 3, width: 300 }}>
        <Typography 
          variant="h6" 
          sx={{ mb: 2 }}
          id="event-edit-title"
        >
          Editează Evenimentul
        </Typography>
        
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Titlu"
            value={editedEvent.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            aria-label="Titlul evenimentului"
            inputProps={{ 'aria-required': 'true' }}
          />

          <TextField
            fullWidth
            label="Locație"
            value={editedEvent.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            aria-label="Locația evenimentului"
          />

          <TextField
            fullWidth
            label="Profesor"
            value={editedEvent.professor || ''}
            onChange={(e) => handleInputChange('professor', e.target.value)}
            aria-label="Numele profesorului"
          />

          <FormControl fullWidth>
            <InputLabel id="event-type-label">Tip</InputLabel>
            <Select
              labelId="event-type-label"
              value={editedEvent.type || ''}
              label="Tip"
              onChange={(e) => handleInputChange('type', e.target.value)}
              aria-label="Tipul evenimentului"
            >
              {EVENT_TYPES.map(type => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="time-slot-label">Interval Orar</InputLabel>
            <Select
              labelId="time-slot-label"
              value={editedEvent.timeSlot}
              label="Interval Orar"
              onChange={(e) => handleInputChange('timeSlot', e.target.value)}
              aria-label="Intervalul orar"
            >
              {TIME_SLOTS.map(slot => (
                <MenuItem key={slot.value} value={slot.value}>{slot.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="day-label">Ziua</InputLabel>
            <Select
              labelId="day-label"
              value={editedEvent.dayOfWeek}
              label="Ziua"
              onChange={(e) => handleInputChange('dayOfWeek', Number(e.target.value))}
              aria-label="Ziua evenimentului"
            >
              {WEEK_DAYS.map(day => (
                <MenuItem key={day.value} value={day.value}>{day.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between', 
            mt: 2
          }}>
            <DangerButton 
              variant="contained"
              onClick={handleDelete}
              aria-label="Șterge evenimentul"
              sx={{ width: '30%' }}
            >
              ȘTERGE
            </DangerButton>
            <SecondaryButton 
              variant="outlined"
              onClick={onClose}
              aria-label="Anulează editarea"
              sx={{ width: '30%' }}
            >
              ANULEAZĂ
            </SecondaryButton>
            <PrimaryButton 
              variant="contained"
              onClick={handleSave}
              aria-label="Salvează modificările"
              sx={{ width: '30%' }}
            >
              SALVEAZĂ
            </PrimaryButton>
          </Box>
        </Stack>
      </Box>
    </Popover>
  );
};

export default React.memo(EventEditPopover);