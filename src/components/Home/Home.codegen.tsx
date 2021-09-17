import * as Types from '../../generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type HomeQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type HomeQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', id: string, daySchedule: Array<{ __typename?: 'ScheduleEvent', timeFrom: string, timeTo: string, name: string, teacher: string, room: string, order: string, color: string, id: string }> } };


export const HomeDocument = gql`
    query home($key: String!) {
  user(key: $key) {
    id
    daySchedule {
      timeFrom
      timeTo
      name
      teacher
      room
      order
      color
      id
    }
  }
}
    `;
export type HomeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HomeQuery, HomeQueryVariables>, 'query'> & ({ variables: HomeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const HomeComponent = (props: HomeComponentProps) => (
      <ApolloReactComponents.Query<HomeQuery, HomeQueryVariables> query={HomeDocument} {...props} />
    );
    

/**
 * __useHomeQuery__
 *
 * To run a query within a React component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useHomeQuery(baseOptions: Apollo.QueryHookOptions<HomeQuery, HomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
      }
export function useHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeQuery, HomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
        }
export type HomeQueryHookResult = ReturnType<typeof useHomeQuery>;
export type HomeLazyQueryHookResult = ReturnType<typeof useHomeLazyQuery>;
export type HomeQueryResult = Apollo.QueryResult<HomeQuery, HomeQueryVariables>;