import {createTheme} from '@shopify/restyle';
import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const size = {
  //Primary
  width: width,
  height: height,
};
export const palette = {
  //Primary
  primary: '#0C375A',
  primary1: '#02D167',

  //Supporting colors
  support: '#F3F3F3',
  support1: '#FFFFFF',
  support2: '#000000',
  support3: '#C4C4C4',

  // Transparent
  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    white: 'white',
    black: 'black',
    //Primary
    primary: palette.primary,
    primary1: palette.primary1,
    //Supporting colos
    support: palette.support,
    support1: palette.support1,
    support2: palette.support2,
    support3: palette.support3,
    // Transparent
    transparent: palette.transparent,
  },
  spacing: {
    s: 5,
    m: 10,
    l: 20,
    xl: 25,
    xxl: 30,
    xxxl: 35,
    xxxxl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    // 20

    support115medium: {
      color: 'support1',
      fontSize: 22,
      fontWeight: 'bold',
    },
    support113medium: {
      color: 'support1',
      fontSize: 12,
    },
    primary112medium: {
      color: 'primary1',
      fontSize: 12,
    },
    support110medium: {
      color: 'support1',
      fontSize: 10,
    },
    primary16regular: {
      color: 'primary',
      fontSize: 16,
    },
    primary112regular: {
      color: 'primary1',
      fontSize: 10,
    },
    primary12regular: {
      color: 'primary',
      fontSize: 12,
    },
    primary14regular: {
      color: 'primary',
      fontSize: 14,
    },
    support12regular: {
      color: 'support3',
      fontSize: 11,
    },
  },
});

export default theme;
