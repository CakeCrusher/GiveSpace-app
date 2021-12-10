import React, { useState, useEffect } from 'react';
import { Button, Input, VStack } from 'native-base';
import cio from 'cheerio-without-node-native';

import { useField } from '../utils/helperFunctions';
import fetch from 'node-fetch';

const AddingItemInput = () => {
  const item = useField('text', 'television toshiba');

  const handleAddItem = async (val = '') => {
    try {
      const formattedItem = encodeURIComponent(val).replace(/%20/g, '+');
      const URL = `https://www.amazon.com/s?k=television+toshiba&ref=nb_sb_noss_2`;
      console.log(1);
      const response = await fetch(URL);
      console.log(2);
      const htmlString = await response.text();
      console.log(htmlString);
      // console.log(3);
      const $ = cio.load(htmlString);
      console.log('cheerio');
      // console.log(4);
      const heading = $('h1');
      console.log('head!!', heading);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack space={4}>
      <Input {...item} placeholder="enter item" />
      <Button onPress={handleAddItem}>Add</Button>
    </VStack>
  );
};

export default AddingItemInput;
