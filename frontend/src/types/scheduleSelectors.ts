export interface Faculty {
  id: string;
  name: string;
}

export interface Specialization {
  id: string;
  facultyId: string;
  name: string;
}

export interface Year {
  id: string;
  specializationId: string;
  number: number;  
}

export interface Group {
  id: string;
  specializationId: string;
  yearId: string;  
  name: string;
  // year: number;
}

export interface ScheduleFilters {
  facultyId: string;
  specializationId: string;
  yearId: string;  
  groupId: string;
  year: number;
}

export interface ScheduleFiltersProps {
  onFiltersChange: (filters: ScheduleFilters) => void;
}