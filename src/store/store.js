import { createStore } from 'vuex';

import mentorsModule from './modules/mentors/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js'

const store = createStore({
  modules: {
    mentors: mentorsModule,
    requests: requestsModule,
    auth: authModule
  },
  state(){
    return{
      root_url: 'https://vue-first-ea397-default-rtdb.firebaseio.com'
    }
  },
  getters:{
    rootUrl(state){
      return state.root_url;
    }
  }
});

export default store;
