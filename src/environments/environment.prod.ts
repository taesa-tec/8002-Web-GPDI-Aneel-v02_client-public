import {version} from '../../package.json';

export const environment = {
  production: true,
  api_url: '/api',
  version,
  autologin: {
    user: '',
    pass: ''
  }
};
