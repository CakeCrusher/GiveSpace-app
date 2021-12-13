import React from 'react';
import { Icon, Popover, Text, Box, VStack, Pressable } from 'native-base';
import { Feather } from '@expo/vector-icons';

const PopoverIcon = ({ iconName, menuTitle, children }) => {
  return (
    <Popover
      placement={'left top'}
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Icon as={<Feather name={iconName} />} size="sm" />
          </Pressable>
        );
      }}
    >
      <Popover.Content>
        <Popover.Body>
          <Box>
            <Text fontWeight="bold" fontSize="md">
              {menuTitle}
            </Text>
          </Box>
          <VStack>{children}</VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default PopoverIcon;
