import * as Types from '../../generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type MarksByDateQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  dateFrom: Types.Scalars['String'];
  dateTo: Types.Scalars['String'];
}>;


export type MarksByDateQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', id: string, marks: Array<{ __typename?: 'Marks', name: string, mark?: Types.Maybe<string>, id: string, date: string, value: { __typename?: 'Value', NAZEV: string }, subject: { __typename?: 'Subject', ZKRATKA: string } }> } };


export const MarksByDateDocument = gql`
    query marksByDate($key: String!, $dateFrom: String!, $dateTo: String!) {
  user(key: $key) {
    id
    marks(dateFrom: $dateFrom, dateTo: $dateTo) {
      name
      mark
      value {
        NAZEV
      }
      id
      date
      subject {
        ZKRATKA
      }
    }
  }
}
    `;
export type MarksByDateComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MarksByDateQuery, MarksByDateQueryVariables>, 'query'> & ({ variables: MarksByDateQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const MarksByDateComponent = (props: MarksByDateComponentProps) => (
      <ApolloReactComponents.Query<MarksByDateQuery, MarksByDateQueryVariables> query={MarksByDateDocument} {...props} />
    );
    

/**
 * __useMarksByDateQuery__
 *
 * To run a query within a React component, call `useMarksByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarksByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarksByDateQuery({
 *   variables: {
 *      key: // value for 'key'
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *   },
 * });
 */
export function useMarksByDateQuery(baseOptions: Apollo.QueryHookOptions<MarksByDateQuery, MarksByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarksByDateQuery, MarksByDateQueryVariables>(MarksByDateDocument, options);
      }
export function useMarksByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarksByDateQuery, MarksByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarksByDateQuery, MarksByDateQueryVariables>(MarksByDateDocument, options);
        }
export type MarksByDateQueryHookResult = ReturnType<typeof useMarksByDateQuery>;
export type MarksByDateLazyQueryHookResult = ReturnType<typeof useMarksByDateLazyQuery>;
export type MarksByDateQueryResult = Apollo.QueryResult<MarksByDateQuery, MarksByDateQueryVariables>;