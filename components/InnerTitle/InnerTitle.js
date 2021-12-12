import React from 'react';
import { Text } from 'native-base';

const InnerTitle = (props) => {
  const styles = { ...props };
  delete styles.children;
  return (
    <Text fontSize="4xl" fontWeight="medium" {...styles}>
      {props.children}
    </Text>
  );
};

export default InnerTitle;
