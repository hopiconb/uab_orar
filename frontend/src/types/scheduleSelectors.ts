export interface Faculty {
  id: string;
  name: string;
}

export interface Specialization {
  id: string;
  facultyId: string;
  name: string;
}

export interface Group {
  id: string;
  specializationId: string;
  name: string;
  year: number;
}

export interface ScheduleFiltersProps {
  onFiltersChange: (filters: {
    facultyId: string;
    specializationId: string;
    groupId: string;
    year: number;
  }) => void;
}
