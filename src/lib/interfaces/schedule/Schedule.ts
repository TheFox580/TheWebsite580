export interface DaySchedule {
  time: Date;
  title: string;
  category: string;
  estimated_length: number;
  image_name: string;
  channel: string;
}

export interface WeekSchedule {
  start_week: Date;
  end_week: Date;
  days: DaySchedule[];
}
