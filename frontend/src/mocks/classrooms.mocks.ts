import { Classroom, ClassroomWithSchedule } from '../types/classroomMap';
import { WeekDay } from '../types/classesSchedule';

// List of classrooms
export const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'A2',
    building: 'Corp A',
    floor: 1,
    capacity: 120,
    type: 'lecture',
    equipment: ['projector', 'whiteboard', 'computer']
  },
  {
    id: '2',
    name: 'A3',
    building: 'Corp A',
    floor: 1,
    capacity: 80,
    type: 'lecture',
    equipment: ['projector', 'whiteboard']
  },
  {
    id: '3',
    name: 'H1.5',
    building: 'Corp H',
    floor: 1,
    capacity: 30,
    type: 'laboratory',
    equipment: ['computers', 'whiteboard', 'projector']
  },
  {
    id: '4',
    name: 'B2.1',
    building: 'Corp B',
    floor: 2,
    capacity: 50,
    type: 'seminar',
    equipment: ['whiteboard']
  },
  {
    id: '5',
    name: 'C1.3',
    building: 'Corp C',
    floor: 1,
    capacity: 25,
    type: 'laboratory',
    equipment: ['computers', 'specialized equipment']
  }
];

// Mock schedule data for each classroom
export const getClassroomWithSchedule = (classroomId: string): ClassroomWithSchedule | null => {
  const classroom = mockClassrooms.find(c => c.id === classroomId);
  if (!classroom) return null;

  // Different schedule for each classroom
  const scheduleItems = [
    // A2 classroom schedule
    ...(classroomId === '1' ? [
      {
        id: 'a2-1',
        title: 'Arhitectura sistemelor de calcul',
        professor: 'Prof. Popescu',
        dayOfWeek: WeekDay.Monday,
        timeSlot: '10-12',
        type: 'curs',
        color: '#FFE700',
        groupName: 'Informatică anul 2'
      },
      {
        id: 'a2-2',
        title: 'Baze de date',
        professor: 'Prof. Ionescu',
        dayOfWeek: WeekDay.Wednesday,
        timeSlot: '14-16',
        type: 'curs',
        color: '#AAB99A',
        groupName: 'Informatică anul 2'
      }
    ] : []),
    
    // A3 classroom schedule
    ...(classroomId === '2' ? [
      {
        id: 'a3-1',
        title: 'Programare orientată pe obiecte',
        professor: 'Prof. Georgescu',
        dayOfWeek: WeekDay.Tuesday,
        timeSlot: '08-10',
        type: 'curs',
        color: '#FFB6C1',
        groupName: 'Informatică anul 1'
      },
      {
        id: 'a3-2',
        title: 'Analiză matematică',
        professor: 'Prof. Marinescu',
        dayOfWeek: WeekDay.Thursday,
        timeSlot: '12-14',
        type: 'curs',
        color: '#ADD8E6',
        groupName: 'Matematică anul 1'
      }
    ] : []),
    
    // H1.5 classroom schedule
    ...(classroomId === '3' ? [
      {
        id: 'h15-1',
        title: 'Programare Web',
        professor: 'Prof. Dumitrescu',
        dayOfWeek: WeekDay.Monday,
        timeSlot: '16-18',
        type: 'laborator',
        color: '#98FB98',
        groupName: 'Informatică anul 3'
      },
      {
        id: 'h15-2',
        title: 'Inteligență artificială',
        professor: 'Prof. Vasilescu',
        dayOfWeek: WeekDay.Friday,
        timeSlot: '10-12',
        type: 'laborator',
        color: '#FFA07A',
        groupName: 'Informatică anul 3'
      }
    ] : []),
    
    // B2.1 classroom schedule
    ...(classroomId === '4' ? [
      {
        id: 'b21-1',
        title: 'Limba engleză',
        professor: 'Prof. Johnson',
        dayOfWeek: WeekDay.Wednesday,
        timeSlot: '08-10',
        type: 'seminar',
        color: '#D8BFD8',
        groupName: 'Informatică anul 1'
      }
    ] : []),
    
    // C1.3 classroom schedule
    ...(classroomId === '5' ? [
      {
        id: 'c13-1',
        title: 'Rețele de calculatoare',
        professor: 'Prof. Constantinescu',
        dayOfWeek: WeekDay.Thursday,
        timeSlot: '16-18',
        type: 'laborator',
        color: '#87CEFA',
        groupName: 'Informatică anul 2'
      },
      {
        id: 'c13-2',
        title: 'Securitate informatică',
        professor: 'Prof. Petrescu',
        dayOfWeek: WeekDay.Tuesday,
        timeSlot: '14-16',
        type: 'laborator',
        color: '#F0E68C',
        groupName: 'Informatică anul 3'
      }
    ] : [])
  ];

  return {
    ...classroom,
    scheduleItems
  };
};
