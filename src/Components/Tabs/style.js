import {StyleSheet, Platform, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  height_55: {
    elevation: 0,
  },

  tabBarItemLabel: {
    marginTop: Platform.OS === 'ios' ? (height <= 750 ? 10 : 16) : 8,
    fontSize: 0,
    color: 'transparent',
  },
});
export default styles;
