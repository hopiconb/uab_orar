export interface TimeSlot {
  start: string;
  end: string;
}

export interface BookedSlot {
  id?: string;
  day: number;
  timeSlot: number;
  professorName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleState {
  bookedSlots: BookedSlot[];
  isLoading: boolean;
  error: string | null;
}