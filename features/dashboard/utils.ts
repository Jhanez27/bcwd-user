export function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function formatLongDate(date: Date | string = new Date()): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function daysBetween(target: Date | string, base: Date = new Date()): number {
  const ms = new Date(target).setHours(0, 0, 0, 0) - new Date(base).setHours(0, 0, 0, 0);
  return Math.round(ms / 86_400_000);
}
