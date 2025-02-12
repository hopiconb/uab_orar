export interface ClassesScheduleEvent {
  // Câmpuri obligatorii
  id: string;                    
  title: string;                 
  location: string;             
  dayOfWeek: number;            
  timeSlot: string;
  professor?: string;           
  type?: 'curs' | 'seminar' | 'laborator';  
  color?: string;                           
  
  
  // Câmpuri pentru management
  createdAt?: string;          // Data creării
  updatedAt?: string;          // Data ultimei actualizări
  semester?: number;           // Semestrul
  year?: number;               // Anul de studiu
  
  // Câmpuri pentru recurență (dacă e cazul)
  isRecurring?: boolean;       // Dacă evenimentul este recurent
  startDate?: string;          // Data de început a semestrului
  endDate?: string;           // Data de sfârșit a semestrului
}

// Tipuri helper pentru formulare
export type EventFormData = Omit<ClassesScheduleEvent, 'id' | 'createdAt' | 'updatedAt'>;

// Enum pentru zilele săptămânii
export enum WeekDay {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6
}

// Constante pentru intervale orare disponibile
export const TIME_SLOTS = [
  "08-10",
  "10-12",
  "12-14",
  "14-16",
  "16-18",
  "18-20"
] as const;

export type TimeSlot = typeof TIME_SLOTS[number];

// Tipuri pentru validare
export interface EventValidation {
  title: boolean;
  location: boolean;
  dayOfWeek: boolean;
  timeSlot: boolean;
}