export type Priority = 1 | 2 | 3

export type Incident = {
  name: string;
  id: number;
  priority: Priority;
  datetime: string;
  locationId: string;
};

export type LocationId= { name: string, id: string }