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
  name: string;
  from: string;
  to: string;
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
