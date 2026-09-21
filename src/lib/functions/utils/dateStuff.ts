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

export function getTimePassed(seconds: number): string {

    if (seconds < 60) return `${seconds} second${seconds == 1 ? "" : "s"}`;
    else if (seconds < 3600) return `${Math.floor(seconds/60)} minute${Math.floor(seconds/60) == 1 ? "" : "s"}`;
    else if (seconds < 86400) return `${Math.floor(seconds/3600)} hour${Math.floor(seconds/3600) == 1 ? "" : "s"}`;
    else if (seconds < 31556952) return `${Math.floor(seconds/(86400))} day${Math.floor(seconds/86400) == 1 ? "" : "s"}`;
    else return `${Math.floor(seconds/31556952)} year${Math.floor(seconds/31556952) == 1 ? "" : "s"}`;
}
