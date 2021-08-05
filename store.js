import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart_id: null,
        control_place: '',
        control_type: '',
        system_color: '',
        system_mounting: '',
        suspension_type: null,
        shape: null,
        sides: null,
        total_length: 0,
        total_tracks: 0,
        system_power: 0,
        power_supply: null,
        accessories: null,
    },
    mutations: {
        updateControlPlace(state, value) {
            state.control_place = value;
        },
        updateControlType(state, value) {
            state.control_type = value;
        },
        updateColor(state, value) {
            state.system_color = value;
        },
        updateMounting(state, value) {
            state.system_mounting = value;
        },
        updateSuspensionType(state, value) {
            state.suspension_type = value;
        },
        updateShape(state, value) {
            state.shape = value;
        },
        updateSides(state, value) {
            state.sides = value;
        },
        updateLength(state, value) {
            state.total_length = value;
        },
        updatePower(state, value) {
            state.system_power = value;
        },
        updatePowerSupply(state, value) {
            state.power_supply = value;
        },
        updateAccessories(state, value) {
            state.accessories = value;
        },
        updateCartId(state, value) {
            state.cart_id = value;
        },
    },
    actions: {},
    getters: {
        cart_id: state => state.cart_id,
        control_place: state => state.control_place,
        control_type: state => state.control_type,
        system_color: state => state.system_color,
        system_mounting: state => state.system_mounting,
        suspension_type: state => state.suspension_type,
        shape: state => state.shape,
        sides: state => state.sides,
        total_length: state => state.total_length,
        system_power: state => state.system_power,
        power_supply: state => state.power_supply,
        accessories: state => state.power_supply,
    },
});
