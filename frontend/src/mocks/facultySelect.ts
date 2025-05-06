// import { Faculty, Specialization, Group, Year } from '../types/scheduleSelectors';

// export const mockFaculties: Faculty[] = [
//   { id: '1', name: 'Informatica' },
//   { id: '2', name: 'Economie' },
// ];

// export const mockSpecializations: Specialization[] = [
//   { id: '1', facultyId: '1', name: 'Informatică' },
//   { id: '2', facultyId: '2', name: 'AA' },
//   { id: '3', facultyId: '2', name: 'Ects' },
// ];

// export const mockGroups: Group[] = [
//   { id: '1', specializationId: '1', name: 'A1', yearId: '1' },
//   { id: '2', specializationId: '1', name: 'A2', yearId: '2' },
//   { id: '3', specializationId: '1', name: 'A3', yearId: '3' },
//   { id: '4', specializationId: '2', name: 'A1', yearId: '4' }
// ];

// export const mockYears: Year[] = [
//   { id: '1', specializationId: '1', number: 1 },
//   { id: '2', specializationId: '1', number: 2 },
//   { id: '3', specializationId: '1', number: 3 },
//   { id: '4', specializationId: '2', number: 1 },
//   { id: '5', specializationId: '2', number: 2 }
// ];

import {
  Faculty,
  Specialization,
  Year,
  Group,
} from "../types/scheduleSelectors";

export const mockFaculties: Faculty[] = [
  { id: "1", name: "Facultatea de Istorie, Litere și Științe ale Educației" },
  { id: "2", name: "Facultatea de Științe Economice" },
  { id: "3", name: "Facultatea de Informatică și Inginerie" },
  { id: "4", name: "Facultatea de Drept și Științe Administrative" },
  { id: "5", name: "Facultatea de Teologie Ortodoxă" },
  { id: "6", name: "Școala Doctorală" },
];

export const mockSpecializations: Specialization[] = [
  // Facultatea de Istorie, Litere și Științe ale Educației
  { id: "1", facultyId: "1", name: "Istorie" },
  { id: "2", facultyId: "1", name: "Arheologie" },
  {
    id: "3",
    facultyId: "1",
    name: "Limba și literatura română - Limba și literatura engleză",
  },
  {
    id: "4",
    facultyId: "1",
    name: "Traducere și interpretare (engleză-franceză)",
  },
  {
    id: "5",
    facultyId: "1",
    name: "Traducere și interpretare (germană-engleză)",
  },
  {
    id: "6",
    facultyId: "1",
    name: "Pedagogia învățământului primar și preșcolar",
  },
  {
    id: "7",
    facultyId: "1",
    name: "Pedagogia învățământului primar și preșcolar - ID Alba",
  },
  {
    id: "8",
    facultyId: "1",
    name: "Pedagogia învățământului primar și preșcolar - ID Deva",
  },

  // Facultatea de Științe Economice
  {
    id: "9",
    facultyId: "2",
    name: "Economia comerțului, turismului și serviciilor",
  },
  {
    id: "10",
    facultyId: "2",
    name: "Economia comerțului, turismului și serviciilor - ID",
  },
  { id: "11", facultyId: "2", name: "Administrarea afacerilor" },
  { id: "12", facultyId: "2", name: "Administrarea afacerilor - ID" },
  {
    id: "13",
    facultyId: "2",
    name: "Administrarea afacerilor (în limba engleză)",
  },
  { id: "14", facultyId: "2", name: "Finanțe și Bănci" },
  {
    id: "15",
    facultyId: "2",
    name: "Contabilitate și informatică de gestiune",
  },
  {
    id: "16",
    facultyId: "2",
    name: "Contabilitate și informatică de gestiune - ID",
  },
  { id: "17", facultyId: "2", name: "Marketing" },

  // Facultatea de Informatică și Inginerie
  { id: "18", facultyId: "3", name: "Informatică" },
  { id: "19", facultyId: "3", name: "Informatică (în limba engleză)" },
  { id: "20", facultyId: "3", name: "Ingineria mediului" },
  { id: "21", facultyId: "3", name: "Măsurători terestre și cadastru" },

  // Facultatea de Drept și Științe Administrative
  { id: "22", facultyId: "4", name: "Drept" },
  { id: "23", facultyId: "4", name: "Administrație publică" },
  { id: "24", facultyId: "4", name: "Administrație publică - ID" },

  // Facultatea de Teologie Ortodoxă
  { id: "25", facultyId: "5", name: "Teologie Ortodoxă Pastorală" },
  { id: "26", facultyId: "5", name: "Teologie Ortodoxă Didactică" },

  // Școala Doctorală
  { id: "27", facultyId: "6", name: "Istorie - Doctorat" },
  { id: "28", facultyId: "6", name: "Filologie - Doctorat" },
  { id: "29", facultyId: "6", name: "Contabilitate - Doctorat" },
  { id: "30", facultyId: "6", name: "Informatică - Doctorat" },
  { id: "31", facultyId: "6", name: "Teologie - Doctorat" },
];

export const mockYears: Year[] = [
  // Exemplu pentru câteva specializări
  { id: "1", specializationId: "1", number: 1 },
  { id: "2", specializationId: "1", number: 2 },
  { id: "3", specializationId: "1", number: 3 },
  { id: "4", specializationId: "9", number: 1 },
  { id: "5", specializationId: "9", number: 2 },
  { id: "6", specializationId: "9", number: 3 },
  { id: "7", specializationId: "18", number: 1 },
  { id: "8", specializationId: "18", number: 2 },
  { id: "9", specializationId: "18", number: 3 },
  { id: "10", specializationId: "22", number: 1 },
  { id: "11", specializationId: "22", number: 2 },
  { id: "12", specializationId: "22", number: 3 },
  { id: "13", specializationId: "22", number: 4 },
  { id: "14", specializationId: "27", number: 1 },
  { id: "15", specializationId: "27", number: 2 },
  { id: "16", specializationId: "27", number: 3 },
];

export const mockGroups: Group[] = [
  // Exemplu pentru câteva grupe
  { id: "1", specializationId: "1", name: "Ist-A1", yearId: "1" },
  { id: "2", specializationId: "1", name: "Ist-A2", yearId: "2" },
  { id: "3", specializationId: "1", name: "Ist-A3", yearId: "3" },
  { id: "4", specializationId: "9", name: "ECTS-A1", yearId: "4" },
  { id: "5", specializationId: "9", name: "ECTS-A2", yearId: "5" },
  { id: "6", specializationId: "9", name: "ECTS-A3", yearId: "6" },
  { id: "7", specializationId: "18", name: "INF-A1", yearId: "7" },
  { id: "8", specializationId: "18", name: "INF-A2", yearId: "8" },
  { id: "9", specializationId: "18", name: "INF-A3", yearId: "9" },
  { id: "10", specializationId: "22", name: "DRP-A1", yearId: "10" },
  { id: "11", specializationId: "22", name: "DRP-A2", yearId: "11" },
  { id: "12", specializationId: "22", name: "DRP-A3", yearId: "12" },
  { id: "13", specializationId: "22", name: "DRP-A4", yearId: "13" },
  { id: "14", specializationId: "27", name: "DOC-IST-A1", yearId: "14" },
  { id: "15", specializationId: "27", name: "DOC-IST-A2", yearId: "15" },
  { id: "16", specializationId: "27", name: "DOC-IST-A3", yearId: "16" },
];
