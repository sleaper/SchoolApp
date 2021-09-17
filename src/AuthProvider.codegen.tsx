import * as Types from './generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type AuthUserQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type AuthUserQuery = { __typename?: 'Query', UserAuth: boolean };

export type RemoveUserMutationVariables = Types.Exact<{
  firebaseToken: Types.Scalars['String'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: boolean };


export const AuthUserDocument = gql`
    query authUser($key: String!) {
  UserAuth(key: $key)
}
    `;
export type AuthUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AuthUserQuery, AuthUserQueryVariables>, 'query'> & ({ variables: AuthUserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AuthUserComponent = (props: AuthUserComponentProps) => (
      <ApolloReactComponents.Query<AuthUserQuery, AuthUserQueryVariables> query={AuthUserDocument} {...props} />
    );
    

/**
 * __useAuthUserQuery__
 *
 * To run a query within a React component, call `useAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useAuthUserQuery(baseOptions: Apollo.QueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
      }
export function useAuthUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
        }
export type AuthUserQueryHookResult = ReturnType<typeof useAuthUserQuery>;
export type AuthUserLazyQueryHookResult = ReturnType<typeof useAuthUserLazyQuery>;
export type AuthUserQueryResult = Apollo.QueryResult<AuthUserQuery, AuthUserQueryVariables>;
export const RemoveUserDocument = gql`
    mutation removeUser($firebaseToken: String!) {
  removeUser(firebaseToken: $firebaseToken)
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;
export type RemoveUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RemoveUserMutation, RemoveUserMutationVariables>, 'mutation'>;

    export const RemoveUserComponent = (props: RemoveUserComponentProps) => (
      <ApolloReactComponents.Mutation<RemoveUserMutation, RemoveUserMutationVariables> mutation={RemoveUserDocument} {...props} />
    );
    

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      firebaseToken: // value for 'firebaseToken'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;