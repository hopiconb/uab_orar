export interface Classroom {
  id: string;
  name: string;
  building: string;
  floor?: number;
  capacity?: number;
  type?: 'lecture' | 'laboratory' | 'seminar' | 'other';
  equipment?: string[];
}

export interface ClassroomScheduleItem {
  id: string;
  title: string;
  professor?: string;
  dayOfWeek: number;
  timeSlot: string;
  type?: 'curs' | 'seminar' | 'laborator';
  color?: string;
  groupName?: string;
}

export interface ClassroomWithSchedule extends Classroom {
  scheduleItems: ClassroomScheduleItem[];
}
