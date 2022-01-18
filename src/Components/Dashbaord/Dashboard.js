import React from 'react';
import {createBox, createText} from '@shopify/restyle';
import {Image, StyleSheet} from 'react-native';
import _ from 'lodash';
import {palette} from '../Theme/Index';
import BottomSheet from '../BottomSheet/BottomSheet';

const Box = createBox();
const Text = createText();
const Logo = require('../../assets/logo/logo.png');
export default ({navigation}) => {
  return (
    <Box flex={1} backgroundColor="primary">
      <Box position="absolute" right={0} m="m" height={50} width={50}>
        <Image
          style={{resizeMode: 'contain', height: 35, width: 35}}
          source={Logo}
        />
      </Box>
      <Text p={'l'} variant={'support115medium'}>
        Debit Card
      </Text>
      <Text paddingHorizontal={'l'} variant={'support113medium'}>
        Available balance
      </Text>
      <Box m="l" flexDirection={'row'} alignItems="center">
        <Box
          alignItems={'center'}
          justifyContent="center"
          height={20}
          width={30}
          borderRadius={6}
          backgroundColor="primary1">
          <Text variant={'support110medium'}>$$</Text>
        </Box>
        <Text pl="s" variant={'support115medium'}>
          3,000
        </Text>
      </Box>
      <BottomSheet navigation={navigation} />
    </Box>
  );
};
