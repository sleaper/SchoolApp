export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AvarageMark = {
  __typename?: 'AvarageMark';
  id: Scalars['String'];
  marks: Scalars['String'];
  subject: Scalars['String'];
  teacher: Scalars['String'];
};

export type CalendarDay = {
  __typename?: 'CalendarDay';
  class: Scalars['String'];
  events?: Maybe<Events>;
  from: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Notes>;
  order: Scalars['String'];
  teacher: Scalars['String'];
  to: Scalars['String'];
};

export type Date = {
  date: Array<Scalars['String']>;
};

export type Events = {
  __typename?: 'Events';
  color?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
};

export type Marks = {
  __typename?: 'Marks';
  date: Scalars['String'];
  id: Scalars['String'];
  mark: Scalars['String'];
  name: Scalars['String'];
  subject: Subject;
  value: Value;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  user: UserMutation;
};


export type MutationAddUserArgs = {
  firebaseToken: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  firebaseToken: Scalars['String'];
};


export type MutationUserArgs = {
  key: Scalars['String'];
};

export type Notes = {
  __typename?: 'Notes';
  note?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  UserAuth: Scalars['Boolean'];
  user: UserQuery;
};


export type QueryUserAuthArgs = {
  key: Scalars['String'];
};


export type QueryUserArgs = {
  key: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['String'];
  marks: Scalars['String'];
  subject: Scalars['String'];
};

export type ScheduleEvent = {
  __typename?: 'ScheduleEvent';
  color: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['String'];
  room: Scalars['String'];
  subjectNum: Scalars['String'];
  teacher: Scalars['String'];
  timeFrom: Scalars['String'];
  timeTo: Scalars['String'];
};

export type Subject = {
  __typename?: 'Subject';
  NAZEV: Scalars['String'];
  PORADI_ZOBRAZENI: Scalars['String'];
  PREDMET_ID: Scalars['String'];
  PRIZNAK_DRUH_PREDMETU: Scalars['String'];
  SKOLNI_ROK_ID: Scalars['String'];
  ZKRATKA: Scalars['String'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  className: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type UserMutation = {
  __typename?: 'UserMutation';
  firebaseToken: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  saveHomeworks: Scalars['String'];
};


export type UserMutationSaveHomeworksArgs = {
  firebaseToken: Scalars['String'];
  payload: Scalars['String'];
};

/** Object representing user */
export type UserQuery = {
  __typename?: 'UserQuery';
  avarageMarks: Array<AvarageMark>;
  calendarDay: Array<CalendarDay>;
  daySchedule: Array<ScheduleEvent>;
  firebaseToken: Scalars['String'];
  homeworks: Array<Scalars['String']>;
  id: Scalars['String'];
  info: UserInfo;
  key: Scalars['String'];
  marks: Array<Marks>;
  name: Scalars['String'];
  report: Array<Report>;
  subjectMarks: Array<Marks>;
};


/** Object representing user */
export type UserQueryCalendarDayArgs = {
  date: Scalars['String'];
};


/** Object representing user */
export type UserQueryMarksArgs = {
  date: Date;
};


/** Object representing user */
export type UserQuerySubjectMarksArgs = {
  subject: Scalars['String'];
};

export type Value = {
  __typename?: 'Value';
  DRUH_HODNOCENI_ID: Scalars['String'];
  NAZEV: Scalars['String'];
  POPIS: Scalars['String'];
  PORADI_ZOBRAZENI: Scalars['String'];
  VAHA: Scalars['String'];
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    