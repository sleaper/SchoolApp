import * as Types from '../../generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type SubjectMarksQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  subject: Types.Scalars['String'];
}>;


export type SubjectMarksQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', id: string, subjectMarks: Array<{ __typename?: 'Marks', id: string, name: string, mark?: Types.Maybe<string>, date: string, value: { __typename?: 'Value', NAZEV: string } }> } };


export const SubjectMarksDocument = gql`
    query subjectMarks($key: String!, $subject: String!) {
  user(key: $key) {
    id
    subjectMarks(subject: $subject) {
      id
      name
      mark
      date
      value {
        NAZEV
      }
    }
  }
}
    `;
export type SubjectMarksComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SubjectMarksQuery, SubjectMarksQueryVariables>, 'query'> & ({ variables: SubjectMarksQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const SubjectMarksComponent = (props: SubjectMarksComponentProps) => (
      <ApolloReactComponents.Query<SubjectMarksQuery, SubjectMarksQueryVariables> query={SubjectMarksDocument} {...props} />
    );
    

/**
 * __useSubjectMarksQuery__
 *
 * To run a query within a React component, call `useSubjectMarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectMarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectMarksQuery({
 *   variables: {
 *      key: // value for 'key'
 *      subject: // value for 'subject'
 *   },
 * });
 */
export function useSubjectMarksQuery(baseOptions: Apollo.QueryHookOptions<SubjectMarksQuery, SubjectMarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectMarksQuery, SubjectMarksQueryVariables>(SubjectMarksDocument, options);
      }
export function useSubjectMarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectMarksQuery, SubjectMarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectMarksQuery, SubjectMarksQueryVariables>(SubjectMarksDocument, options);
        }
export type SubjectMarksQueryHookResult = ReturnType<typeof useSubjectMarksQuery>;
export type SubjectMarksLazyQueryHookResult = ReturnType<typeof useSubjectMarksLazyQuery>;
export type SubjectMarksQueryResult = Apollo.QueryResult<SubjectMarksQuery, SubjectMarksQueryVariables>;