export interface dayInfo {
  timeFrom: Date;
  timeTo: Date;
  name: string;
  teacher: string;
  room: string;
  order: string;
  color: string;
  id: string;
}

export interface CalendarDayTypes {
  type: string;
  name: string;
  timeFrom: string;
  timeTo: string;
  class: string;
  teacher: string;
  id: string;
  order: string;
  notes: Notes | undefined;
  events: Events | undefined;
  __typename?: 'CalendarDay' | undefined;
}

export interface Events {
  __typename?: 'Events' | undefined;
  event: string;
  order: string;
  color: string;
}

export interface Notes {
  __typename?: 'Notes' | undefined;
  note: string;
  order: string;
}
