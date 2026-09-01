import type { Stream } from "$lib/interfaces/schedule/Schedule";

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
