export function getColor(current_int: number): string{
  const result = current_int % 4;
  if (result === 0) return "red";
  else if (result === 1) return "blue";
  else if (result === 2) return "green";
  return "yellow";
}
