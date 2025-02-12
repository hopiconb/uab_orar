import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  Stack,
  SelectChangeEvent
} from '@mui/material';
import { mockFaculties, mockSpecializations, mockGroups } from '../../mocks/facultySelect';
import { ScheduleFiltersProps } from '../../types/scheduleSelectors';

export const ScheduleSelectors: React.FC<ScheduleFiltersProps> = ({ onFiltersChange }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(1);

  const availableSpecializations = mockSpecializations.filter(
    spec => spec.facultyId === selectedFaculty
  );

  const availableGroups = mockGroups.filter(
    group => group.specializationId === selectedSpecialization
  );

  const handleFacultyChange = (event: SelectChangeEvent<string>) => {
    const facultyId = event.target.value;
    setSelectedFaculty(facultyId);
    setSelectedSpecialization('');
    setSelectedGroup('');
    setSelectedYear(1);
    
    onFiltersChange({
      facultyId,
      specializationId: '',
      groupId: '',
      year: 1
    });
  };

  const handleSpecializationChange = (event: SelectChangeEvent<string>) => {
    const specializationId = event.target.value;
    setSelectedSpecialization(specializationId);
    setSelectedGroup('');
    
    onFiltersChange({
      facultyId: selectedFaculty,
      specializationId,
      groupId: '',
      year: selectedYear
    });
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    const group = mockGroups.find(g => g.id === groupId);
    if (group) {
      setSelectedYear(group.year);
      onFiltersChange({
        facultyId: selectedFaculty,
        specializationId: selectedSpecialization,
        groupId,
        year: group.year
      });
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: 'background.paper',
      p: 3,
      borderRadius: 2,
      boxShadow: 1,
      mb: 4
    }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Filtrează Orarul
      </Typography>
      
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Facultate</InputLabel>
          <Select
            value={selectedFaculty}
            label="Facultate"
            onChange={handleFacultyChange}
          >
            {mockFaculties.map((faculty) => (
              <MenuItem key={faculty.id} value={faculty.id}>
                {faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }} disabled={!selectedFaculty}>
          <InputLabel>Specializare</InputLabel>
          <Select
            value={selectedSpecialization}
            label="Specializare"
            onChange={handleSpecializationChange}
          >
            {availableSpecializations.map((spec) => (
              <MenuItem key={spec.id} value={spec.id}>
                {spec.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }} disabled={!selectedSpecialization}>
          <InputLabel>Grupă</InputLabel>
          <Select
            value={selectedGroup}
            label="Grupă"
            onChange={handleGroupChange}
          >
            {availableGroups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name} (Anul {group.year})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default ScheduleSelectors;