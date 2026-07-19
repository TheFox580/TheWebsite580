import type { Stream } from "$lib/interfaces/schedule/Schedule";

export function getDay(week_day: number) {
  while (week_day < 0) week_day += 7;
  while (week_day > 6) week_day -= 7;
  switch (week_day) {
    case 0: return "Sunday"
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thrusday";
    case 5: return "Friday";
    case 6: return "Satruday";
    default: return "None"
  }
}

export function getMonth(month: number){
  while (month < 0) month += 12;
  while (month > 11) month -= 12;
  switch (month){
    case 0: return "January";
    case 1: return "February";
    case 2: return "March";
    case 3: return "April";
    case 4: return "May";
    case 5: return "June";
    case 6: return "July";
    case 7: return "August";
    case 8: return "September";
    case 9: return "October";
    case 10: return "November";
    case 11: return "December";
    default: return "None"
  }
}

export function isNow(stream: Stream): boolean{
  const end_time = new Date((stream.time+stream.estimated_length*60)*1000);
  const now = new Date();

  return new Date(stream.time*1000) <= now && now < end_time;
}

export function isPast(stream: Stream): boolean{
  const end_time = new Date((stream.time+stream.estimated_length*60)*1000);
  const now = new Date();

  return end_time <= now;
}

export function isFuture(stream: Stream): boolean {
  return !isNow(stream) && !isPast(stream);
}
