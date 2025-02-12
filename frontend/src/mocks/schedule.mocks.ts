import { ClassesScheduleEvent, WeekDay } from '../types/classesSchedule';

export const mockScheduleEvents: ClassesScheduleEvent[] = [
  {
    id: '1',
    title: 'Arhitectura sistemelor de calcul',
    location: 'Corp C - Sala A2',
    dayOfWeek: WeekDay.Monday, // Luni
    timeSlot: '10-12',
    professor: 'Prof. Popescu',
    type: 'curs',
		color: '#FF0000'
  },
  {
    id: '2',
    title: 'Programare Web',
    location: 'Corp A - Sala 2.1',
    dayOfWeek: WeekDay.Tuesday, // Marți
    timeSlot: '14-16',
    professor: 'Prof. Ionescu',
    type: 'laborator',
		color	: '#00F558'
  }
];