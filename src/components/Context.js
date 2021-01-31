// import AsyncStorage from '@react-native-community/async-storage';
// import {hasError} from 'apollo-client/core/ObservableQuery';
// import React, {createContext, useState} from 'react';
// import base64 from 'react-native-base64';
// import {gql, useLazyQuery} from '@apollo/client';

// //export const MyContext = createContext({});

// const GET_USER = gql`
//   query($name: String!, $key: String!) {
//     UserInfo(name: $name, key: $key) {
//       Name
//       PersonId
//       ClassName
//       AvarageMarks
//     }
//   }
// `;

// export default function Context({children}) {
//   const [loadCall, {called, loading, data}] = useLazyQuery(GET_USER);
//   const [user, setUser] = useState(null);

//   return (
//     <MyContext.Provider
//       value={{
//         user,
//         LogIn: async (name, passw) => {
//           let HashedName = base64.encode(name);
//           let HashedPassw = base64.encode(passw);
//           let connect = HashedName + ':' + HashedPassw;

//           //key
//           let key = base64.encode(connect);
//           let user = {name: HashedName, key: key};

//           loadCall({variables: {name: name, key: key}});

//           if (data) {
//             setUser(user);
//             await AsyncStorage.setItem('user', JSON.stringify(user), (err) => {
//               if (err) {
//                 console.error(err);
//               }
//             });
//           }

//           console.log(user);
//         },
//         LogOut: async () => {
//           setUser(null);
//           await AsyncStorage.removeItem('user', (err) => {
//             if (err) {
//               console.error(err);
//             }
//           });
//         },
//       }}>
//       {children}
//     </MyContext.Provider>
//   );
// }
