import * as Types from './generated/graphqlBaseTypes';

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
export type UserInfoQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type UserInfoQuery = { __typename?: 'Query', user: { __typename?: 'UserQuery', id: string, info: { __typename?: 'UserInfo', name: string, className: string, personId: string, id: string } } };

export type AddUserMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  key: Types.Scalars['String'];
  firebaseToken: Types.Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: boolean };


export const UserInfoDocument = gql`
    query userInfo($key: String!) {
  user(key: $key) {
    id
    info {
      name
      className
      personId
      id
    }
  }
}
    `;
export type UserInfoComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserInfoQuery, UserInfoQueryVariables>, 'query'> & ({ variables: UserInfoQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const UserInfoComponent = (props: UserInfoComponentProps) => (
      <ApolloReactComponents.Query<UserInfoQuery, UserInfoQueryVariables> query={UserInfoDocument} {...props} />
    );
    

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;
export const AddUserDocument = gql`
    mutation addUser($name: String!, $key: String!, $firebaseToken: String!) {
  addUser(name: $name, key: $key, firebaseToken: $firebaseToken)
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;
export type AddUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddUserMutation, AddUserMutationVariables>, 'mutation'>;

    export const AddUserComponent = (props: AddUserComponentProps) => (
      <ApolloReactComponents.Mutation<AddUserMutation, AddUserMutationVariables> mutation={AddUserDocument} {...props} />
    );
    

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      key: // value for 'key'
 *      firebaseToken: // value for 'firebaseToken'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;