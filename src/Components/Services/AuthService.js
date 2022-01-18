import {request} from './APICentral';

export const forgotPassword = data => {
  return request({url: '/forgotPassword', method: 'POST', data}, false);
};

export default AuthService;
