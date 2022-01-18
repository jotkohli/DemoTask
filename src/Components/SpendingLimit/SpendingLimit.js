import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {palette} from '../Theme/Index';
import AuthConstants from '../../Redux/AuthConstants';

const Box = createBox();
const Text = createText();
const Logo = require('../../assets/logo/logo.png');
const Back = require('../../assets/arrow/back.png');
export default ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      input: '',
    },
  );

  const saveLimit = () => {
    dispatch({
      type: AuthConstants.LIMIT,
      limit: state.input,
    });
    navigation.navigate('Dashboard');
  };
  const goBack = () => {
    dispatch({
      type: AuthConstants.LIMIT,
      limit: '',
    });
    navigation.goBack(null);
  };

  return (
    <Box flex={1} backgroundColor="primary">
      <Box height={40}>
        <Box position="absolute" right={0} m="m" height={50} width={50}>
          <Image
            style={{resizeMode: 'contain', height: 35, width: 35}}
            source={Logo}
          />
        </Box>
        <TouchableOpacity
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          onPress={() => goBack()}
          style={styles.iconView}>
          <Image style={styles.backIcon} source={Back} />
        </TouchableOpacity>
      </Box>
      <Box marginVertical={'l'}>
        <Text paddingHorizontal={'l'} variant={'support115medium'}>
          Spending limit
        </Text>
      </Box>

      <Box
        flex={1}
        backgroundColor={'support1'}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}>
        <Text textAlign={'center'} p="m" variant={'primary14regular'}>
          Set a weekly debit card spending limit
        </Text>
        <Box
          borderBottomWidth={1}
          borderBottomColor="support3"
          width={'90%'}
          height={45}
          flexDirection="row"
          alignSelf={'center'}
          alignItems="center">
          <Box
            alignItems={'center'}
            justifyContent="center"
            height={20}
            width={30}
            borderRadius={6}
            backgroundColor="primary1">
            <Text variant={'support110medium'}>$$</Text>
          </Box>
          <TextInput
            style={styles.text}
            value={state.input}
            editable={false}
            placeholder=""
          />
        </Box>
        <Box mt="m" marginHorizontal="l">
          <Text variant={'support12regular'}>
            Here weekly means the last 7 days - not a calendar week
          </Text>
        </Box>

        <FlatList
          horizontal={true}
          contentContainerStyle={{}}
          data={[{price: '5000'}, {price: '10000'}, {price: '15000'}]}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setState({input: item.price})}>
              <Box
                mt="l"
                backgroundColor="support"
                height={30}
                width={100}
                marginHorizontal="m"
                alignItems={'center'}
                justifyContent="center"
                borderRadius={5}>
                <Text variant={'primary112medium'}>$$ {item.price}</Text>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity onPress={() => saveLimit()}>
          <Box
            marginVertical={'m'}
            height={50}
            width={'80%'}
            alignSelf="center"
            backgroundColor={state.input !== '' ? 'primary1' : 'support'}
            borderRadius={15}
            alignItems="center"
            justifyContent={'center'}>
            <Text variant={'support113medium'}>Save</Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: palette.support1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    left: 0,
    right: 0,
  },
  iconView: {
    position: 'absolute',
    left: 0,
    margin: 15,
    height: 50,
    width: 50,
  },
  backIcon: {
    resizeMode: 'contain',
    height: 15,
    width: 15,
    tintColor: palette.support1,
  },
  text: {fontSize: 18, color: palette.support2},
});
