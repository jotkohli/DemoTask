import {combineReducers} from 'redux';
import authConstants from './AuthConstants';

export const userInfoReducer = (
  state = {
    cardNumber: false,
    limit: '',
  },
  action,
) => {
  switch (action.type) {
    case authConstants.HIDE_CARD_NUMBER:
      return {
        ...state,
        cardNumber: action.cardNumber,
      };
    case authConstants.SHOW_CARD_NUMBER:
      return {
        ...state,
        cardNumber: action.cardNumber,
      };
    case authConstants.LIMIT:
      return {
        ...state,
        limit: action.limit,
      };

    default:
      return state;
  }
};

export const authReducers = combineReducers({
  user: userInfoReducer,
});
