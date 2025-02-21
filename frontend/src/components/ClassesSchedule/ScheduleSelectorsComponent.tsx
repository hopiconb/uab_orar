import React, { useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Stack,
  SelectChangeEvent
} from '@mui/material';
import { mockFaculties, mockSpecializations, mockGroups, mockYears } from '../../mocks/facultySelect';
import { ScheduleFiltersProps } from '../../types/scheduleSelectors';

export const ScheduleSelectors: React.FC<ScheduleFiltersProps> = ({ onFiltersChange }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  const availableSpecializations = mockSpecializations.filter(
    spec => spec.facultyId === selectedFaculty
  );

  const availableYears = mockYears.filter(
    year => year.specializationId === selectedSpecialization
  );

  const availableGroups = mockGroups.filter(
    group => group.specializationId === selectedSpecialization && group.yearId === selectedYear
  );

  const handleFacultyChange = (event: SelectChangeEvent<string>) => {
    const facultyId = event.target.value;
    setSelectedFaculty(facultyId);
    setSelectedSpecialization('');
    setSelectedYear('');
    setSelectedGroup('');
    
    onFiltersChange({
      facultyId,
      specializationId: '',
      yearId: '',
      groupId: '',
      year: 0
    });
  };

  const handleSpecializationChange = (event: SelectChangeEvent<string>) => {
    const specializationId = event.target.value;
    setSelectedSpecialization(specializationId);
    setSelectedYear('');
    setSelectedGroup('');
    
    onFiltersChange({
      facultyId: selectedFaculty,
      specializationId,
      yearId: '',
      groupId: '',
      year: 0
    });
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const yearId = event.target.value;
    setSelectedYear(yearId);
    setSelectedGroup('');
    
    const selectedYearData = mockYears.find(y => y.id === yearId);
    
    onFiltersChange({
      facultyId: selectedFaculty,
      specializationId: selectedSpecialization,
      yearId,
      groupId: '',
      year: selectedYearData ? selectedYearData.number : 0
    });
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    
    const selectedYearData = mockYears.find(y => y.id === selectedYear);
    
    onFiltersChange({
      facultyId: selectedFaculty,
      specializationId: selectedSpecialization,
      yearId: selectedYear,
      groupId,
      year: selectedYearData ? selectedYearData.number : 0
    });
  };

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        width: '100%',
        maxWidth: '800px'  // Am mărit puțin pentru noul selector
      }}
    >
      <FormControl size="small" sx={{ minWidth: 200 }}>
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

      <FormControl size="small" sx={{ minWidth: 200 }} disabled={!selectedFaculty}>
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

      <FormControl size="small" sx={{ minWidth: 150 }} disabled={!selectedSpecialization}>
        <InputLabel>An</InputLabel>
        <Select
          value={selectedYear}
          label="An"
          onChange={handleYearChange}
        >
          {availableYears.map((year) => (
            <MenuItem key={year.id} value={year.id}>
              Anul {year.number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 150 }} disabled={!selectedYear}>
        <InputLabel>Grupă</InputLabel>
        <Select
          value={selectedGroup}
          label="Grupă"
          onChange={handleGroupChange}
        >
          {availableGroups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ScheduleSelectors;