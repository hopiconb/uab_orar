import { ClassesScheduleEvent, WeekDay } from '../types/classesSchedule';

export const mockScheduleEvents: ClassesScheduleEvent[] = [
  {
    id: '1',
    title: 'Arhitectura sistemelor de calcul',
    location: 'Corp C - Sala A2',
    dayOfWeek: WeekDay.Monday, 
    timeSlot: '10-12',
    professor: 'Prof. Popescu',
    type: 'curs',
		color: '#FFE700'
  },
  {
    id: '2',
    title: 'Programare Web',
    location: 'Corp A - Sala 2.1',
    dayOfWeek: WeekDay.Tuesday, 
    timeSlot: '14-16',
    professor: 'Prof. Ionescu',
    type: 'laborator',
		color	: '#AAB99A'
  }
];