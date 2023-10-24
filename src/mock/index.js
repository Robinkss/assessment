import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      //console.log('data', data);
      return data;
    });
  },
});
