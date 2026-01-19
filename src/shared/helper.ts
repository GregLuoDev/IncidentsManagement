import type { Priority } from "./type";

export function formatLocalDateTime(isoString: string) {
  return new Date(isoString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export function formatLocalName(locationName: string) {
  return locationName
    .split('/')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export const priorityName: Record<Priority, string> = { 1: 'High', 2: "Medium", 3: "Low" };
export const priorityIcon: Record<Priority, string> = { 1: '/img/alarm-high.svg', 2: "/img/alarm-medium.svg", 3: "/img/alarm-low.svg" };
