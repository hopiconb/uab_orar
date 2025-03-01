import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import { ContentContainer, SectionTitle, ScheduleEventCard } from '../common/StyledComponents';
import { mockClassrooms, getClassroomWithSchedule } from '../../mocks/classrooms.mocks';
import { ClassroomWithSchedule, ClassroomScheduleItem } from '../../types/classroomMap';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { TIME_SLOTS } from '../../constants/scheduleConstants';

// Helper function to convert WeekDay enum to string
const getDayName = (dayIndex: number): string => {
  const days = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
  return days[dayIndex] || '';
};

const ScheduleItem: React.FC<{ item: ClassroomScheduleItem }> = ({ item }) => {
  return (
    <ScheduleEventCard 
      sx={{ 
        p: 2, 
        mb: 2, 
        backgroundColor: item.color || '#f5f5f5',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {item.title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <PersonIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
        <Typography variant="body2">
          {item.professor || 'Profesor nespecificat'}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <AccessTimeIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
        <Typography variant="body2">
          {getDayName(item.dayOfWeek)}, {item.timeSlot}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <GroupIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
        <Typography variant="body2">
          {item.groupName || 'Grupă nespecificată'}
        </Typography>
      </Box>
      
      {item.type && (
        <Box 
          sx={{ 
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            mt: 1,
            borderRadius: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.75rem',
            fontWeight: 'medium'
          }} 
        >
          {item.type === 'curs' ? 'Curs' : 
           item.type === 'seminar' ? 'Seminar' : 'Laborator'}
        </Box>
      )}
    </ScheduleEventCard>
  );
};

export const ClassroomSchedule: React.FC = () => {
  const [selectedClassroomId, setSelectedClassroomId] = useState<string>('');
  const [classroomData, setClassroomData] = useState<ClassroomWithSchedule | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const timeSlots = useMemo(() => 
    TIME_SLOTS.map(slot => slot.value),
    []
  );

  const handleClassroomChange = (event: SelectChangeEvent<string>) => {
    setSelectedClassroomId(event.target.value);
  };

  useEffect(() => {
    if (!selectedClassroomId) {
      setClassroomData(null);
      return;
    }

    const fetchClassroomData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const data = getClassroomWithSchedule(selectedClassroomId);
        
        if (data) {
          setClassroomData(data);
        } else {
          setError('Nu s-au găsit informații pentru sala selectată');
        }
      } catch (err) {
        setError('A apărut o eroare la încărcarea datelor');
        console.error('Error fetching classroom data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassroomData();
  }, [selectedClassroomId]);

  const getScheduleItemForSlot = (dayIndex: number, timeSlot: string) => {
    if (!classroomData?.scheduleItems) return null;
    
    return classroomData.scheduleItems.find(
      item => item.dayOfWeek === dayIndex && item.timeSlot === timeSlot
    );
  };

  const renderScheduleTable = () => {
    if (!classroomData) return null;

    return (
      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="classroom schedule table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableCell width="12%" sx={{ fontWeight: 'bold' }}>Ora</TableCell>
              <TableCell width="16%" sx={{ fontWeight: 'bold' }}>Luni</TableCell>
              <TableCell width="16%" sx={{ fontWeight: 'bold' }}>Marți</TableCell>
              <TableCell width="16%" sx={{ fontWeight: 'bold' }}>Miercuri</TableCell>
              <TableCell width="16%" sx={{ fontWeight: 'bold' }}>Joi</TableCell>
              <TableCell width="16%" sx={{ fontWeight: 'bold' }}>Vineri</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((timeSlot) => (
              <TableRow key={timeSlot}>
                <TableCell sx={{ fontWeight: 'medium', backgroundColor: theme.palette.grey[50] }}>
                  {timeSlot}
                </TableCell>
                {[0, 1, 2, 3, 4].map((dayIndex) => {
                  const scheduleItem = getScheduleItemForSlot(dayIndex, timeSlot);
                  
                  return (
                    <TableCell key={`${dayIndex}-${timeSlot}`} sx={{ p: 1 }}>
                      {scheduleItem && (
                        <Box
                          sx={{
                            backgroundColor: scheduleItem.color || '#f5f5f5',
                            p: 1,
                            borderRadius: 1,
                            height: '100%'
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold">
                            {scheduleItem.title}
                          </Typography>
                          <Typography variant="caption" display="block">
                            {scheduleItem.professor}
                          </Typography>
                          <Typography variant="caption" display="block">
                            {scheduleItem.groupName}
                          </Typography>
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderClassroomInfo = () => {
    if (!classroomData) return null;

    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {classroomData.building} - Sala {classroomData.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>
                Etaj {classroomData.floor}, {classroomData.type === 'lecture' ? 'Sală de curs' : 
                  classroomData.type === 'laboratory' ? 'Laborator' : 
                  classroomData.type === 'seminar' ? 'Sală de seminar' : 'Altă sală'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <GroupIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>Capacitate: {classroomData.capacity} locuri</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Dotări:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {classroomData.equipment?.map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: (theme) => theme.palette.grey[100],
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    mr: 1,
                    mb: 1
                  }} 
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const renderScheduleCards = () => {
    if (!classroomData?.scheduleItems.length) {
      return (
        <Alert severity="info" sx={{ mt: 3 }}>
          Nu există evenimente programate pentru această sală
        </Alert>
      );
    }

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="medium">
          Evenimente programate:
        </Typography>
        
        <Grid container spacing={2}>
          {classroomData.scheduleItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ScheduleItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <ContentContainer>
      <SectionTitle variant="h4" component="h1">
        Orar Săli
      </SectionTitle>
      
      <Typography variant="body1" paragraph>
        Selectați o sală pentru a vedea programul și informațiile acesteia
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 4, maxWidth: 400 }}>
        <InputLabel id="classroom-select-label">Sală</InputLabel>
        <Select
          labelId="classroom-select-label"
          id="classroom-select"
          value={selectedClassroomId}
          label="Sală"
          onChange={handleClassroomChange}
        >
          {mockClassrooms.map((classroom) => (
            <MenuItem key={classroom.id} value={classroom.id}>
              {classroom.building} - Sala {classroom.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {classroomData && !loading && (
        <>
          {renderClassroomInfo()}
          {renderScheduleTable()}
          {renderScheduleCards()}
        </>
      )}
    </ContentContainer>
  );
};

export default React.memo(ClassroomSchedule);
