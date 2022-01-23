import * as Types from '../../generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type AvarageMarksQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type AvarageMarksQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', id: string, avarageMarks: Array<{ __typename?: 'AvarageMark', subjectName: string, subjectNameShort: string, teacher: string, marks: string, id: string }> } };


export const AvarageMarksDocument = gql`
    query avarageMarks($key: String!) {
  user(key: $key) {
    id
    avarageMarks {
      subjectName
      subjectNameShort
      teacher
      marks
      id
    }
  }
}
    `;
export type AvarageMarksComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AvarageMarksQuery, AvarageMarksQueryVariables>, 'query'> & ({ variables: AvarageMarksQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AvarageMarksComponent = (props: AvarageMarksComponentProps) => (
      <ApolloReactComponents.Query<AvarageMarksQuery, AvarageMarksQueryVariables> query={AvarageMarksDocument} {...props} />
    );
    

/**
 * __useAvarageMarksQuery__
 *
 * To run a query within a React component, call `useAvarageMarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvarageMarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvarageMarksQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useAvarageMarksQuery(baseOptions: Apollo.QueryHookOptions<AvarageMarksQuery, AvarageMarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvarageMarksQuery, AvarageMarksQueryVariables>(AvarageMarksDocument, options);
      }
export function useAvarageMarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvarageMarksQuery, AvarageMarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvarageMarksQuery, AvarageMarksQueryVariables>(AvarageMarksDocument, options);
        }
export type AvarageMarksQueryHookResult = ReturnType<typeof useAvarageMarksQuery>;
export type AvarageMarksLazyQueryHookResult = ReturnType<typeof useAvarageMarksLazyQuery>;
export type AvarageMarksQueryResult = Apollo.QueryResult<AvarageMarksQuery, AvarageMarksQueryVariables>;