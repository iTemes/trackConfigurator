import Vue from 'vue';
import Router from 'vue-router';
import FirstStep from './pages/FirstStep.vue';
import SecondStep from './pages/SecondStep.vue';
import ThirdStep from './pages/ThirdStep.vue';
import NotFoundComponent from './pages/NotFoundComponent.vue';
import FinalCart from './pages/FinalCart.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/inf_configurator',
    routes: [
        {
            path: '/',
            name: 'firstStep',
            component: FirstStep,
        },
        {
            path: '/secondStep',
            name: 'secondStep',
            component: SecondStep,
        },
        {
            path: '/thirdStep',
            name: 'thirdStep',
            component: ThirdStep,
        },
        {
            path: '/configurator_cart',
            name: 'cart',
            component: FinalCart,
        },
        { path: '*', component: NotFoundComponent },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0 };
    },
});
