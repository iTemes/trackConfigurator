<template>
    <section class="configurator-step">
        <h2 class="visually-hidden">
            Первый шаг - выбор параметров системы
        </h2>

        <Header />

        <div class="container container--main">
            <form ref="stepForm">
                <fieldset class="form-group mb-5">
                    <legend class="form-head">
                        Блок питания
                    </legend>
                    <div class="row radio-group">
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="external-control">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="control_place"
                                    type="radio"
                                    name="control_place"
                                    id="external-control"
                                    value="external-control">
                                <span class="custom-checkbox" />
                                <span>Внешний</span>
                            </label>
                            <!-- eslint-disable -->
                            <div
                                class="radio-group__tooltip"
                                data-bs-toggle="tooltip"
                                title="Большой ассортимент источников питания от моделей с малой мощностью (100 Вт) до самых мощных (960 Вт). ИП устанавливаются в доступных для обслуживания местах: в щитовые, запотолочное пространство или скрытые люки."
                                data-bs-placement="right">
                                <span>?</span>
                            </div>
                             <!-- eslint-enable -->
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="integrated-control">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="control_place"
                                    type="radio"
                                    name="control_place"
                                    id="integrated-control"
                                    value="integrated-control">
                                <span class="custom-checkbox" />
                                <span>Встроенный в трек</span>
                            </label>
                            <!-- eslint-disable -->
                            <div
                                class="radio-group__tooltip"
                                data-bs-toggle="tooltip"
                                title="Источники питания в компактном корпусе легко устанавливаются внутрь трека, разработаны специально для трековой системы Infinity. Фиксатор обеспечивает надежное крепление. Подключается к сети 220В."
                                data-bs-placement="right">
                                <span>?</span>
                            </div>
                             <!-- eslint-enable -->
                        </div>
                    </div>
                </fieldset>
                <fieldset class="form-group mb-5">
                    <legend class="form-head">
                        Способ управления
                    </legend>
                    <div class="row radio-group">
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="dali-control">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="control_type"
                                    type="radio"
                                    name="control_type"
                                    id="dali-control"
                                    value="dali-control">
                                <span class="custom-checkbox" />
                                <span>DIM DALI</span>
                            </label>
                            <!-- eslint-disable -->
                            <div
                                class="radio-group__tooltip"
                                data-bs-toggle="tooltip"
                                title="Драйверы поддерживают работу по протоколу DALI. Это позволяет управлять каждым светильником в отдельности: включать/выключать, а также диммировать."
                                data-bs-placement="right">
                                <span>?</span>
                            </div>
                             <!-- eslint-enable -->
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="smart-control">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="control_type"
                                    type="radio"
                                    name="control_type"
                                    id="smart-control"
                                    value="smart-control">
                                <span class="custom-checkbox" />
                                <span>INF SMART LIGHT</span>
                            </label>
                            <!-- eslint-disable -->
                            <div
                                class="radio-group__tooltip"
                                data-bs-toggle="tooltip"
                                title="Питает треки DALI и программирует светильники по группам включения. Принимает сигналы управления по Bluetooth, дает возможность управлять светильниками через мобильное приложение. Ретранслирует сигналы управления между устройствами, увеличивая радиус действия. Позволяет осуществить полноценное управление, даже когда на потолок выведен только провод питания."
                                data-bs-placement="right">
                                <span>?</span>
                            </div>
                             <!-- eslint-enable -->
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="non-dim-control">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="control_type"
                                    type="radio"
                                    name="control_type"
                                    id="non-dim-control"
                                    value="non-dim-control">
                                <span class="custom-checkbox" />
                                <span>NO DIM</span>
                            </label>
                            <!-- eslint-disable -->
                            <div
                                class="radio-group__tooltip"
                                data-bs-toggle="tooltip"
                                title="Выбирайте эту опцию, если вы не планируете диммировать ваши светильники"
                                data-bs-placement="right">
                                <span>?</span>
                            </div>
                             <!-- eslint-enable -->
                        </div>
                    </div>
                </fieldset>
                <fieldset class="form-group mb-5">
                    <legend class="form-head">
                        Выбор цвета
                    </legend>
                    <div class="row radio-group">
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="black-system-color">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    :disabled="system_mounting === 'stretch-ceiling'"
                                    v-model="system_color"
                                    type="radio"
                                    name="system-color"
                                    id="black-system-color"
                                    value="black">
                                <span class="custom-checkbox" />
                                <span>Черный</span>
                            </label>
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="white-system-color">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    :disabled="system_mounting === 'stretch-ceiling'"
                                    v-model="system_color"
                                    type="radio"
                                    name="system-color"
                                    id="white-system-color"
                                    value="white">
                                <span class="custom-checkbox" />
                                <span>Белый</span>
                            </label>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="form-group mb-5">
                    <legend class="form-head">
                        Тип встраивания
                    </legend>
                    <div class="row radio-group">
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="recessed-mounting">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="system_mounting"
                                    type="radio"
                                    name="system-mounting"
                                    id="recessed-mounting"
                                    value="recessed">
                                <span class="custom-checkbox" />
                                <span>Встроенный</span>
                            </label>
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="surface-mounting">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="system_mounting"
                                    type="radio"
                                    name="system-mounting"
                                    id="surface-mounting"
                                    value="surface">
                                <span class="custom-checkbox" />
                                <span>Накладной</span>
                            </label>
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="suspended-mounting">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="system_mounting"
                                    type="radio"
                                    name="system-mounting"
                                    id="suspended-mounting"
                                    value="suspended">
                                <span class="custom-checkbox" />
                                <span>Подвесной</span>
                            </label>
                        </div>
                        <div class="col-12 col-md-3 col-xxl-2 d-flex align-items-center radio-group__item">
                            <label
                                class="d-flex align-items-center"
                                for="stretch-ceiling-mounting">
                                <input
                                    tabindex="1"
                                    class="visually-hidden"
                                    v-model="system_mounting"
                                    type="radio"
                                    name="system-mounting"
                                    id="stretch-ceiling-mounting"
                                    value="stretch-ceiling">
                                <span class="custom-checkbox" />
                                <span>В натяжной потолок</span>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </form>

            <div
                v-if="next_step"
                class="result-container">
                <div class="row">
                    <div class="col col-md-6">
                        <img
                            :src="preview_photo"
                            alt="">
                    </div>
                    <div class="col col-md-4">
                        <img
                            :src="preview_schema"
                            alt="">
                    </div>
                </div>
            </div>
        </div>

        <Footer
            :enable-next="next_step"
            :reset-step="resetStep"
            @push_next="pushNext"
            link="/secondStep" />
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Tooltip } from 'bootstrap';
import Footer from '../components/Footer/Footer.vue';
import Header from '../components/Header/Header.vue';

export default {
    components: {
        Footer, Header,
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            placeFromStore: 'control_place',
            typeFromStore: 'control_type',
            colorFromStore: 'system_color',
            mountingFromStore: 'system_mounting',
        }),
        control_place: {
            get() {
                return this.placeFromStore;
            },
            set(newValue) {
                this.updateControlPlace(newValue);
            },
        },
        control_type: {
            get() {
                return this.typeFromStore;
            },
            set(newValue) {
                this.updateControlType(newValue);
            },
        },
        system_color: {
            get() {
                return this.colorFromStore;
            },
            set(newValue) {
                this.updateColor(newValue);
            },
        },
        system_mounting: {
            get() {
                return this.mountingFromStore;
            },
            set(newValue) {
                this.updateMounting(newValue);
            },
        },
        next_step() {
            if (
                this.control_place
                && this.control_type
                && this.system_mounting
                && this.system_color
            ) {
                return true;
            }
            return false;
        },
        preview_photo() {
            const startPath = 'https://www.centrsvet.ru/media/uploads/svetilnik/trekovie_svetilniki/inf_config';
            return `${startPath}/${this.system_mounting}_${this.system_color}.jpg`;
        },
        preview_schema() {
            const startPath = 'https://www.centrsvet.ru/media/uploads/svetilnik/trekovie_svetilniki/inf_config';
            return `${startPath}/${this.system_mounting}_shema.svg`;
        },
        pageStateOptions() {
            return {
                control_place: this.control_place,
                control_type: this.control_type,
                system_mounting: this.system_mounting,
                system_color: this.system_color,
            };
        },
    },
    watch: {
        pageStateOptions(value) {
            // eslint-disable-next-line no-unused-vars
            const path = `${window.location.pathname}?control_place=${value.control_place}&control_type=${value.control_type}&system_mounting=${value.system_mounting}&system_color=${value.system_color}`;

            // window.history.pushState(null, document.title, path);
        },
    },
    methods: {
        ...mapMutations([
            // `this.functionName(value)` будет вызывать `this.$store.commit('functionName', value)`
            'updateControlPlace',
            'updateControlType',
            'updateColor',
            'updateMounting',
        ]),
        updateLocationHash() {
            const windowData = this.$route.query;
            // подставляем данные в computed свойства из hash
            // eslint-disable-next-line no-restricted-syntax
            for (const key in windowData) {
                if (this[key] === '') {
                    this[key] = windowData[key];
                }
            }
        },
        resetStep() {
            this.$refs.stepForm.reset();
            window.history.pushState(null, document.title, window.location.pathname);
            this.updateControlPlace('');
            this.updateControlType('');
            this.updateColor('');
            this.updateMounting('');
            this.$forceUpdate();
        },
        pushNext(link) {
            const configDetails = {
                control_place: this.control_place,
                control_type: this.control_type,
                system_mounting: this.system_mounting,
                system_color: this.system_color,
            };
            sessionStorage.setItem('configDetails', JSON.stringify(configDetails));
            this.$router.push(link);
        },
    },
    created() {
        // this.updateLocationHash();
    },
    mounted() {
        // this.updateLocationHash();
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
    },
};
</script>
