import React, {useReducer, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {palette} from '../Theme/Index';
import {ScrollView} from 'react-native-gesture-handler';
import AuthConstants from '../../Redux/AuthConstants';
const {height, width} = Dimensions.get('screen');
const Box = createBox();
const Text = createText();
const Logo = require('../../assets/logo/logo.png');
const EyeHide = require('../../assets/eye/password-hide.png');
const EyeShow = require('../../assets/eye/eye-icon.png');
export default ({navigation}) => {
  const dispatch = useDispatch();

  const [alignment] = useState(new Animated.Value(0));

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      isEnabled: false,
      isTrue: false,
      progressStatus: 0,
    },
  );
  const toggleSwitch = previousState => {
    setState({isEnabled: previousState});
    if (previousState == true) {
      navigation.navigate('SpendingLimit');
    }
  };
  const toggleSwitchSecond = previousState => {
    setState({isTrue: previousState});
  };
  const bringUpActionSheet = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  const hideTheActionSheet = () => {
    Animated.timing(alignment, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  const actionSheetInterpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 10, 0],
  });

  const actionSheetStyle = {
    bottom: actionSheetInterpolate,
  };

  const gestureHandler = e => {
    console.log(e, 'here is e.....');
    if (e.nativeEvent.contentOffset.y > 0) bringUpActionSheet();
    else if (e.nativeEvent.contentOffset.y < 0) hideTheActionSheet();
  };
  const user = useSelector(state => ({
    ...state.auth.user,
  }));
  console.log({user});

  const {cardNumber, limit} = user;
  useEffect(() => {
    if (limit == '') {
      setState({isEnabled: false});
    }
    onAnimate();
  }, [limit]);

  const onAnimate = () => {
    const per = ('1000' / limit) * '100';
    console.log({per});

    setState({progressStatus: per});
  };

  return (
    <Animated.View style={[styles.container, actionSheetStyle]}>
      <TouchableOpacity
        onPress={() => {
          cardNumber
            ? dispatch({
                type: AuthConstants.HIDE_CARD_NUMBER,
                cardNumber: false,
              })
            : dispatch({
                type: AuthConstants.SHOW_CARD_NUMBER,
                cardNumber: true,
              });
        }}
        style={styles.insideContainer}>
        {cardNumber ? (
          <>
            <Image style={styles.img} source={EyeHide} />

            <Text pl="s" variant={'primary112regular'}>
              Hide card number
            </Text>
          </>
        ) : (
          <>
            <Image style={styles.img} source={EyeShow} />

            <Text pl="s" variant={'primary112regular'}>
              Show card number
            </Text>
          </>
        )}
      </TouchableOpacity>
      <Box
        alignSelf={'center'}
        borderRadius={10}
        height={200}
        width={'90%'}
        zIndex={500}
        backgroundColor="primary1"
        style={{marginTop: -60}}
        p={'l'}>
        <Text pt={'xxxl'} variant={'support115medium'}>
          Mark Henry
        </Text>
        {cardNumber ? (
          <Text pt={'l'} variant={'support113medium'}>
            {'0  0  0  0       0  0  0  0       0  0  0  0       0  0  0  0'}
          </Text>
        ) : (
          <Text pt={'l'} variant={'support113medium'}>
            {'*  *  *  *       *  *  *  *       *  *  *  *       0  0  0  0'}
          </Text>
        )}
        <Box
          pt={'m'}
          flexDirection={'row'}
          alignItems="center"
          width={'60%'}
          justifyContent="space-between">
          <Text variant={'support113medium'}>Thru:12/20</Text>
          {cardNumber ? (
            <Text variant={'support113medium'}>CVV:1 2 3</Text>
          ) : (
            <Text variant={'support113medium'}>CVV:* * *</Text>
          )}
        </Box>
        <Box
          position="absolute"
          right={0}
          m="l"
          flexDirection={'row'}
          alignItems="center">
          <Image
            style={{tintColor: '#FFFFFF', height: 30, width: 30}}
            source={Logo}
          />
          <Text variant={'support113medium'}>apsire</Text>
        </Box>
        <Box position="absolute" right={0} bottom={0} m="l">
          <Text variant={'support115medium'}>VISA</Text>
        </Box>
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => gestureHandler(e)}>
        {state.isEnabled ? (
          <Box>
            <Box
              m="l"
              justifyContent={'space-between'}
              flexDirection="row"
              alignItems={'center'}>
              <Text>Debit card spending limit</Text>
              <Box flexDirection={'row'} alignItems="center">
                <Text variant={'primary112regular'}>{'$1000'}</Text>
                <Box
                  height={15}
                  width={1}
                  backgroundColor="support3"
                  marginHorizontal={'s'}
                />
                <Text variant={'support12regular'}>${limit}</Text>
              </Box>
            </Box>
            <Box
              width={'90%'}
              marginHorizontal="l"
              alignSelf={'center'}
              borderColor="support3"
              backgroundColor={'support3'}
              borderRadius={15}>
              <Animated.View
                style={[styles.inner, {width: state.progressStatus + '%'}]}
              />
            </Box>
          </Box>
        ) : null}
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Top-up account</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
        </Box>
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Weekly spending limit</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
          <Box position={'absolute'} right={5}>
            <ToggleSwitch
              isOn={state.isEnabled}
              onColor={palette.primary}
              offColor={palette.support}
              size="small"
              trackOffStyle={{backgroundColor: palette.support3}}
              onToggle={isOn => toggleSwitch(isOn)}
            />
          </Box>
        </Box>
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Top-up account</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
          <Box position={'absolute'} right={5}>
            <ToggleSwitch
              isOn={state.isTrue}
              onColor={palette.primary}
              offColor={palette.support}
              size="small"
              trackOffStyle={{backgroundColor: palette.support3}}
              onToggle={isOn => toggleSwitchSecond(isOn)}
            />
          </Box>
        </Box>
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Top-up account</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
        </Box>
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Top-up account</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
        </Box>
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Top-up account</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
        </Box>
        <Box flexDirection={'row'} alignItems="center" m="m">
          <Box
            height={30}
            width={30}
            borderRadius={15}
            backgroundColor="primary"></Box>
          <Box ml="m">
            <Text variant={'primary12regular'}>Top-up account</Text>
            <Text variant={'support12regular'}>
              Deposit money to your account to use with card
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: palette.support1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    lef: 0,
    right: 0,
    bottom: 0,
    height: height / 1.8,
    width: width,
  },
  inner: {
    width: '100%',
    height: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 35,
    backgroundColor: palette.primary1,
  },
  insideContainer: {
    position: 'absolute',
    right: 20,
    top: 0,
    height: 30,
    width: 120,
    backgroundColor: palette.support1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: -85,
    flexDirection: 'row',
  },
  img: {
    resizeMode: 'contain',
    tintColor: palette.primary1,
    height: 12,
    width: 12,
  },
});
