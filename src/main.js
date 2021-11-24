import { createApp } from 'vue'
import store from '@/store';

import App from './App.vue';



createApp(App)
    .use(store)
    .mount('#app');

require('@/assets/css/index.css');
require('@/assets/css/base.css');