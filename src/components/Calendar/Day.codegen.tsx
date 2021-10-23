import * as Types from '../../generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type CalendarDayQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  date: Types.Scalars['String'];
}>;


export type CalendarDayQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', id: string, calendarDay: Array<{ __typename?: 'CalendarDay', id: string, name: string, teacher: string, from: string, to: string, class: string, order: string, notes?: Types.Maybe<{ __typename?: 'Notes', note?: Types.Maybe<string>, order?: Types.Maybe<string> }>, events?: Types.Maybe<{ __typename?: 'Events', event?: Types.Maybe<string>, color?: Types.Maybe<string>, order?: Types.Maybe<string> }> }> } };


export const CalendarDayDocument = gql`
    query calendarDay($key: String!, $date: String!) {
  user(key: $key) {
    id
    calendarDay(date: $date) {
      id
      name
      teacher
      from
      to
      class
      order
      notes {
        note
        order
      }
      events {
        event
        color
        order
      }
    }
  }
}
    `;
export type CalendarDayComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CalendarDayQuery, CalendarDayQueryVariables>, 'query'> & ({ variables: CalendarDayQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const CalendarDayComponent = (props: CalendarDayComponentProps) => (
      <ApolloReactComponents.Query<CalendarDayQuery, CalendarDayQueryVariables> query={CalendarDayDocument} {...props} />
    );
    

/**
 * __useCalendarDayQuery__
 *
 * To run a query within a React component, call `useCalendarDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalendarDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalendarDayQuery({
 *   variables: {
 *      key: // value for 'key'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCalendarDayQuery(baseOptions: Apollo.QueryHookOptions<CalendarDayQuery, CalendarDayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CalendarDayQuery, CalendarDayQueryVariables>(CalendarDayDocument, options);
      }
export function useCalendarDayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CalendarDayQuery, CalendarDayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CalendarDayQuery, CalendarDayQueryVariables>(CalendarDayDocument, options);
        }
export type CalendarDayQueryHookResult = ReturnType<typeof useCalendarDayQuery>;
export type CalendarDayLazyQueryHookResult = ReturnType<typeof useCalendarDayLazyQuery>;
export type CalendarDayQueryResult = Apollo.QueryResult<CalendarDayQuery, CalendarDayQueryVariables>;