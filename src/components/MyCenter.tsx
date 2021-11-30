import React from 'react';

import {Center, useColorMode} from 'native-base';
export default function MyCenter({children}) {
  const {colorMode} = useColorMode();

  return (
    <Center
      height={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={colorMode === 'dark' ? 'black' : 'white'}>
      {children}
    </Center>
  );
}
