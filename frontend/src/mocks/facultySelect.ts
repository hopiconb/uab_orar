import { Faculty, Specialization, Group, Year } from '../types/scheduleSelectors';

export const mockFaculties: Faculty[] = [
  { id: '1', name: 'Info' },
  { id: '2', name: 'Economie' },
];

export const mockSpecializations: Specialization[] = [
  { id: '1', facultyId: '1', name: 'Informatică' },
  { id: '2', facultyId: '2', name: 'AA' },
  { id: '3', facultyId: '2', name: 'Ects' },
];

export const mockGroups: Group[] = [
  { id: '1', specializationId: '1', name: 'A1' },
  { id: '2', specializationId: '1', name: 'A2' },
  { id: '3', specializationId: '1', name: 'A3' },
  { id: '4', specializationId: '2', name: 'A1' }
];

export const mockYears: Year[] = [
  { id: '1', specializationId: '1', number: 1 },
  { id: '2', specializationId: '1', number: 2 },
  { id: '3', specializationId: '1', number: 3 },
  { id: '4', specializationId: '2', number: 1 },
  { id: '5', specializationId: '2', number: 2 }
];