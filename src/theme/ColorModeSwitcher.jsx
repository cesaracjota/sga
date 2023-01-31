import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('Oscuro', 'Claro');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      size="lg"
      rounded={'full'}
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      marginLeft="2"
      marginRight="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      variant={'ghost'}
      {...props}
    />
  );
};
