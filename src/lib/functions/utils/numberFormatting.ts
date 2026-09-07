export function z(n: number): string {
  return (n < 10 ? "0" : "") + n;
}

export function formatNumber(n: number): string {
    return n.toLocaleString()
}
