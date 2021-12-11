import React, { useState, useEffect } from 'react';
import { Slide, Box, Spinner } from 'native-base';

const LoadingScreen = ({ isLoading }) => {
  return (
    <Slide in={isLoading} placement="top">
      <Box h="100%" w="100%" position="absolute" opacity="80" bg="#343434">
        <Box flex="1" alignItems="center" justifyContent="center">
          <Spinner size="lg" />
        </Box>
      </Box>
    </Slide>
  );
};

export default LoadingScreen;
