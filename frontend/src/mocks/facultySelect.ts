import { Faculty, Specialization, Group } from '../types/scheduleSelectors';

export const mockFaculties: Faculty[] = [
  { id: '1', name: 'Facultatea de Informatică' },
  { id: '2', name: 'Facultatea de Matematică' },
  { id: '3', name: 'Facultatea de Fizică' }
];

export const mockSpecializations: Specialization[] = [
  { id: '1', facultyId: '1', name: 'Informatică' },
  { id: '2', facultyId: '1', name: 'Informatică Aplicată' },
  { id: '3', facultyId: '2', name: 'Matematică' },
  { id: '4', facultyId: '2', name: 'Matematică-Informatică' }
];

export const mockGroups: Group[] = [
  { id: '1', specializationId: '1', name: 'A1', year: 1 },
  { id: '2', specializationId: '1', name: 'A2', year: 1 },
  { id: '3', specializationId: '1', name: 'B1', year: 2 },
  { id: '4', specializationId: '2', name: 'A1', year: 1 }
];