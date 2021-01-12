import { version } from './version';

export const environment = {
  production: true,
  api_url: 'http://192.168.1.91:4200/api',
  version: version,
  autologin: {
    user: '',
    pass: ''
  }
};
