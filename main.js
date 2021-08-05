/* eslint-disable no-new */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';

import router from './router';
import store from './store';

import messages from './locales/translate';
import './styles/scss/main.scss';

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages,
});

new Vue({
    router,
    store,
    el: '#app',
    i18n,
    render: h => h(App),
});
