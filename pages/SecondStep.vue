<template>
    <section class="configurator-step">
        <h2 class="visually-hidden">
            Второй шаг - выбор формы системы
        </h2>

        <Header />

        <div class="container container--main">
            <form v-if="mountingFromStore">
                <fieldset class="form-group">
                    <legend
                        class="form-head"
                        :class="{'check': shape}">
                        Выберите форму
                        <button
                            v-if="shape"
                            @click="reset_shape()">
                            {{ $t(`message.${shape}`) }}
                        </button>
                        <svg
                            v-if="shape"
                            class="tick"
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" /></svg>
                    </legend>

                    <div
                        v-show="!shape"
                        class="row radio-group  pt-xl-5">
                        <div class="col-6 col-md-3  radio-group__item">
                            <label
                                class="d-flex flex-column align-items-center justify-content-center"
                                for="shape-line">
                                <input
                                    id="shape-line"
                                    v-model="shape"
                                    class="visually-hidden"
                                    type="radio"
                                    name="shape"
                                    value="shape-line">
                                <span class="radio-group__title">Линия</span>
                                <span class="shape-box">
                                    <svg
                                        width="84"
                                        height="10"
                                        viewBox="0 0 84 10"
                                        fill="none">
                                        <rect
                                            width="84"
                                            height="10"
                                            fill="#999999" />
                                    </svg>
                                </span>
                            </label>
                        </div>
                        <div class="col-6 col-md-3  radio-group__item">
                            <label
                                class="d-flex flex-column align-items-center justify-content-center"
                                for="shape-corner">
                                <input
                                    id="shape-corner"
                                    v-model="shape"
                                    class="visually-hidden"
                                    type="radio"
                                    name="shape"
                                    value="shape-corner">
                                <span class="radio-group__title">Угол</span>
                                <span class="shape-box">
                                    <svg
                                        width="84"
                                        height="84"
                                        viewBox="0 0 84 84"
                                        fill="none">
                                        <path
                                            d="M0 74H84V84H0V74Z"
                                            fill="#999999" />
                                        <rect
                                            width="10"
                                            height="84"
                                            fill="#999999" />
                                    </svg>
                                </span>
                            </label>
                        </div>
                        <div class="col-6 col-md-3  radio-group__item">
                            <label
                                class="d-flex flex-column align-items-center justify-content-center"
                                for="shape-u">
                                <input
                                    id="shape-u"
                                    v-model="shape"
                                    class="visually-hidden"
                                    type="radio"
                                    name="shape"
                                    value="shape-u">
                                <span class="radio-group__title">U - образная </span>
                                <span class="shape-box">
                                    <svg
                                        width="84"
                                        height="84"
                                        viewBox="0 0 84 84"
                                        fill="none">
                                        <path
                                            d="M0 74H84V84H0V74Z"
                                            fill="#999999" />
                                        <rect
                                            width="10"
                                            height="84"
                                            fill="#999999" />
                                        <rect
                                            x="74"
                                            width="10"
                                            height="84"
                                            fill="#999999" />
                                    </svg>
                                </span>
                            </label>
                        </div>
                        <div class="col-6 col-md-3   radio-group__item">
                            <label
                                class="d-flex flex-column align-items-center justify-content-center"
                                for="shape-square">
                                <input
                                    id="shape-square"
                                    v-model="shape"
                                    class="visually-hidden"
                                    type="radio"
                                    name="shape"
                                    value="shape-square">
                                <span class="radio-group__title">Прямоугольная </span>
                                <span class="shape-box">
                                    <svg
                                        width="84"
                                        height="84"
                                        viewBox="0 0 84 84"
                                        fill="none">
                                        <path
                                            d="M0 74H84V84H0V74Z"
                                            fill="#999999" />
                                        <rect
                                            width="10"
                                            height="84"
                                            fill="#999999" />
                                        <path
                                            d="M84 10H0V0H84V10Z"
                                            fill="#999999" />
                                        <rect
                                            x="84"
                                            y="84"
                                            width="10"
                                            height="84"
                                            transform="rotate(180 84 84)"
                                            fill="#999999" />
                                    </svg>
                                </span>
                            </label>
                        </div>
                    </div>
                </fieldset>
                <fieldset
                    v-if="isSuspensionSystem && shape"
                    class="form-group">
                    <legend
                        class="form-head"
                        :class="{ 'check': suspensionType }">
                        Выберите систему подвеса
                        <button
                            v-if="suspensionType"
                            @click.prevent="reset_suspension()">
                            {{ $t(`message.${suspensionType}`) }}
                        </button>
                        <svg
                            v-if="suspensionType"
                            class="tick"
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" /></svg>
                    </legend>

                    <div
                        v-show="!suspensionType && shape"
                        class="row radio-group  pt-xl-5">
                        <div class="col-12 col-md-3  radio-group__item">
                            <label
                                class="d-flex flex-column align-items-center justify-content-center"
                                for="suspension-tros">
                                <input
                                    id="suspension-tros"
                                    v-model="suspensionType"
                                    class="visually-hidden"
                                    type="radio"
                                    name="suspensionType"
                                    value="suspension-tros">
                                <span class="radio-group__title">ТРОСОВЫЙ ПОДВЕС</span>
                                <span class="shape-box">
                                    Картинка для подвеса
                                </span>
                            </label>
                        </div>
                        <div class="col-12 col-md-3  radio-group__item">
                            <label
                                class="d-flex flex-column align-items-center justify-content-center"
                                for="suspension-tros-hide">
                                <input
                                    id="suspension-tros-hide"
                                    v-model="suspensionType"
                                    class="visually-hidden"
                                    type="radio"
                                    name="suspensionType"
                                    value="suspension-tros-hide">
                                <span class="radio-group__title">СКРЫТЫЙ ТРОСОВЫЙ ПОДВЕС</span>
                                <span class="shape-box">
                                    Картинка для подвеса
                                </span>
                            </label>
                        </div>
                    </div>
                </fieldset>
                <fieldset
                    v-if="isAddTrackEnable"
                    class="form-group">
                    <legend class="form-head">
                        Добавьте треки
                    </legend>
                    <div class="tracks mb-5">
                        <!-- Nav tabs -->
                        <tabs
                            :on-select="handleSelectTab"
                            class="my-tabs">
                            <tab
                                v-for="(side, name) in sidesForTabs"
                                :key="side.name"
                                :title="side.name">
                                <div class="tracks__config d-flex align-items-center">
                                    <img
                                        class="side-image mr-3"
                                        style="max-height: 4rem;"
                                        :src="require(`@/track_configurator/assets/images/${side.side_image}.svg`)"
                                        alt="">
                                    <div
                                        class="tracks__buttons d-flex"
                                        ref="tracksButtons">
                                        <button
                                            class="btn btn-track btn-track--large"
                                            type="button"
                                            data-length="2500"
                                            :disabled="remainsLengthSystem < 2500"
                                            @click="handleAddTrackButton(name, $event)">
                                            2500 мм
                                            <span class="plus">+</span>
                                            <svg
                                                class="btn-track__size-icon"
                                                width="100"
                                                height="11"
                                                viewBox="0 0 100 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 0H1V11H0V0Z"
                                                    fill="black" />
                                                <path
                                                    d="M0 5H100V6H0V5Z"
                                                    fill="black" />
                                                <path
                                                    d="M99 0H100V11H99V0Z"
                                                    fill="black" />
                                            </svg>
                                        </button>
                                        <button
                                            class="btn btn-track btn-track--medium"
                                            type="button"
                                            data-length="2000"
                                            :disabled="remainsLengthSystem < 2000"
                                            @click="handleAddTrackButton(name, $event)">
                                            2000 мм
                                            <span class="plus">+</span>
                                            <svg
                                                class="btn-track__size-icon"
                                                width="100"
                                                height="12"
                                                viewBox="0 0 100 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <line
                                                    x1="0.5"
                                                    x2="0.5"
                                                    y2="11"
                                                    stroke="black" />
                                                <line
                                                    x1="1"
                                                    y1="5.5"
                                                    x2="58"
                                                    y2="5.5"
                                                    stroke="black" />
                                                <line
                                                    x1="99.5"
                                                    x2="99.5"
                                                    y2="11"
                                                    stroke="black" />
                                                <line
                                                    x1="99"
                                                    y1="5.5"
                                                    x2="65"
                                                    y2="5.5"
                                                    stroke="black" />
                                                <line
                                                    x1="65.4218"
                                                    y1="0.268438"
                                                    x2="58.4218"
                                                    y2="11.2684"
                                                    stroke="black" />
                                            </svg>
                                        </button>
                                        <button
                                            class="btn btn-track btn-track--small"
                                            type="button"
                                            data-length="1000"
                                            :disabled="remainsLengthSystem < 1000"
                                            @click="handleAddTrackButton(name, $event)">
                                            1000 мм
                                            <span class="plus">+</span>
                                            <svg
                                                class="btn-track__size-icon"
                                                width="100"
                                                height="12"
                                                viewBox="0 0 100 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <line
                                                    x1="0.5"
                                                    x2="0.5"
                                                    y2="11"
                                                    stroke="black" />
                                                <path
                                                    d="M1 5.5H23.5"
                                                    stroke="black" />
                                                <line
                                                    x1="99.5"
                                                    x2="99.5"
                                                    y2="11"
                                                    stroke="black" />
                                                <path
                                                    d="M99 5.5L30 5.5"
                                                    stroke="black" />
                                                <line
                                                    x1="30.4218"
                                                    y1="0.268438"
                                                    x2="23.4218"
                                                    y2="11.2684"
                                                    stroke="black" />
                                            </svg>
                                        </button>
                                        <button
                                            class="btn btn-track"
                                            @click="enterTrackSize()"
                                            type="button">
                                            Ввести размер
                                            <span class="plus">+</span>
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="tracks__overview"
                                    ref="tracksOverview">
                                    <small v-if="side.tracks.length">Расположение показано в виде сверху</small>
                                    <div class="tracks__field d-flex align-items-center">
                                        <div
                                            v-for="(track, index) in side.tracks"
                                            :key="index"
                                            class="track"
                                            :class="trackLengthClass(track.track_length)">
                                            <span class="track__item"> {{ track.track_length }} мм </span>
                                            <button
                                                type="button"
                                                class="track__delete"
                                                @click="handleRemoveTrack(name, index, $event)">
                                                <!-- eslint-disable -->
                                                <svg width="24px" height="24px" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512">
                                                    <g>
                                                        <g>
                                                            <line class="st1" x1="169.449" x2="342.551" y1="169.449" y2="342.551"/>
                                                            <line class="st1" x1="342.551" x2="169.449" y1="169.449" y2="342.551"/>
                                                        </g>
                                                        <g>
                                                            <path d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"/></g></g><g id="expanded"><g><path d="M267.314,256l80.894-80.894c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256,244.686    l-80.894-80.894c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L244.686,256l-80.894,80.894    c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256,267.314l80.894,80.894    c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L267.314,256z"/><path d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                        <!-- eslint-enable -->
                                        <div
                                            v-if="!side.tracks.length"
                                            class="track track--placeholder"
                                            @click="showBtnsTooltip()">
                                            <span class="track__item"> Добавить трек </span>
                                        </div>
                                    </div>
                                </div>
                            </tab>
                        </tabs>
                        <span
                            class="tracks__length"
                            v-if="totalLength">
                            Общая длинна конструкции: {{ totalLength }} мм
                        </span>
                    </div>
                </fieldset>
            </form>
            <p v-else>
                <b>Шаг 1</b> не выполнен
                <router-link
                    to="/"
                    exact-path>
                    Вернуться
                </router-link>
            </p>
            <TableResult
                :show="isAddTrackEnable"
                :total-container-for-tracks="totalContainerForTracks"
                :total-suspension="totalSuspension"
                :corners="corners"
                :total-connectors="totalConnectors"
                :total-metalic-connectors="totalMetalicConnectors"
                :stubs="stubs"
                :is-smart-light="isSmartLight"
                :is-power-adaptor="isPowerAdaptor" />
        </div>

        <!-- Modal -->
        <div
            ref="sizeModal"
            class="modal fade"
            id="sizeModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5
                            class="modal-title"
                            id="exampleModalLabel">
                            Введите длинну трека
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close" />
                    </div>
                    <div class="modal-body">
                        <input
                            :value="customValue"
                            @input="updatecustomValue"
                            min="200"
                            max="2500"
                            type="number"
                            name="customValue"
                            step="100"
                            placeholder="200-2500"
                            id="customValue">
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Отмена
                        </button>
                        <button
                            :disabled="customValue < minSize"
                            @click="handleAddCustomTrack(currentSide, customValue)"
                            type="button"
                            class="btn btn-dark">
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Toasts -->
        <div
            class="toast-relative"
            aria-live="polite"
            aria-atomic="true">
            <div class="toast-container p-3">
                <ToastVue
                    :key="index"
                    :toast="toast"
                    v-for="(toast, index) in toasts" />
            </div>
        </div>

        <Footer
            :enable-next="nextStep"
            :reset-step="resetStep"
            @push_next="pushNext"
            link="/thirdStep" />
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Tabs, Tab } from 'vue-slim-tabs';
import { Modal } from 'bootstrap';
import smoothscroll from 'smoothscroll-polyfill';
import Footer from '../components/Footer/Footer.vue';
import Header from '../components/Header/Header.vue';
import TableResult from '../components/TableResult/TableResult.vue';
import ToastVue from '../components/Toast/ToastVue.vue';
import createToast from '../utils/toasts';
import {
    SHAPE,
    MAX_LENGTH,
    TRACK_SIZE,
    MIN_SIZE,
} from '../utils/constans';

export default {
    components: {
        Header,
        Footer,
        Tabs,
        Tab,
        TableResult,
        ToastVue,
    },
    data() {
        return {
            corners: 0,
            stubs: 0,
            customSizeModal: null,
            customValue: null,
            minSize: MIN_SIZE,
            currentSide: null,
            toasts: [],
        };
    },
    computed: {
        ...mapState({
            shapeFromStore: 'shape',
            sidesFromStore: 'sides',
            mountingFromStore: 'system_mounting',
            typeFromStore: 'control_type',
            placeFromStore: 'control_place',
            totalLengthFromStore: 'total_length',
            accsessoriesFromStore: 'accessories',
            suspensionTypeFromStore: 'suspension_type',
        }),
        shape: {
            get() {
                return this.shapeFromStore;
            },
            set(newValue) {
                this.updateShape(newValue);
            },
        },
        sides: {
            get() {
                return this.sidesFromStore;
            },
            set(newValue) {
                this.updateSides(newValue);
            },
        },
        totalLength: {
            get() {
                return this.totalLengthFromStore;
            },
            set(newValue) {
                this.updateLength(newValue);
            },
        },
        suspensionType: {
            get() {
                return this.suspensionTypeFromStore;
            },
            set(newValue) {
                this.updateSuspensionType(newValue);
            },
        },
        sidesForTabs() {
            if (this.shape === 'shape-square') {
                const sidesForSqare = Object.keys(this.sides).filter(side => {
                    if (this.sides[side].title === 'sideC' || this.sides[side].title === 'sideD') {
                        return false;
                    } return true;
                }).reduce((res, key) => {
                    res[key] = this.sides[key];
                    return res;
                }, {});
                return sidesForSqare;
            }

            return this.sides;
        },
        isAddTrackEnable() {
            if (this.isSuspensionSystem) {
                return this.shape && this.suspensionType;
            }
            return this.shape;
        },
        remainsLengthSystem() {
            return MAX_LENGTH - this.totalLength;
        },
        totalTracks() {
            const tracksCount = Math.ceil(this.totalLength / TRACK_SIZE);
            return tracksCount;
        },
        totalContainerForTracks() {
            if (this.mountingFromStore === 'stretch-ceiling') {
                return this.totalTracks;
            }
            return 0;
        },
        totalConnectors() {
            if (!this.shape) {
                return 0;
            }

            let connectors = 0;

            Object.entries(this.sides).forEach(([, value]) => {
                connectors += value.side_connectors;
            });

            return connectors;
        },
        totalMetalicConnectors() {
            if (!this.shape) {
                return 0;
            }

            if (this.mountingFromStore !== 'recessed') {
                return (this.totalConnectors * 4) / 2;
            }

            return this.totalConnectors * 4;
        },
        totalSuspension() {
            if (this.mountingFromStore === 'suspended') {
                return this.traksOnSides * 2;
            }
            return 0;
        },
        traksOnSides() {
            let traksOnSides = 0;
            if (!this.shape) {
                return traksOnSides;
            }
            Object.keys(this.sides).forEach(side => {
                traksOnSides += this.sides[side].tracks.length;
            });
            return traksOnSides;
        },
        isPowerAdaptor() {
            if (this.placeFromStore === 'external-control') {
                return 1;
            }
            return false;
        },
        isSuspensionSystem() {
            if (this.mountingFromStore === 'suspended') {
                return true;
            }
            return false;
        },
        isSmartLight() {
            if (this.typeFromStore === 'smart-control') {
                return true;
            }

            return false;
        },
        nextStep() {
            if (!this.sides) {
                return false;
            }
            let nextStep = true;
            Object.entries(this.sidesForTabs).forEach(([, value]) => {
                if (!value.side_total_tracks) {
                    nextStep = false;
                }
            });

            return nextStep;
        },
    },
    watch: {
        shape(value) {
            if (!value) return;

            const { corners, sides, stubs } = SHAPE[this.shape];
            // if (this.mountingFromStore === 'recessed') {
            //     this.corners = corners;
            // }
            this.sides = sides;
            this.corners = corners;

            // eslint-disable-next-line prefer-destructuring
            this.currentSide = Object.keys(this.sides)[0];
            this.stubs = stubs;
            this.totalLength = 0;
            createToast({ text: `Форма системы - ${this.$t(`message.${value}`)}. Добавьте треки на каждую из сторон, чтобы продолжить.`, delay: 15000 }, this.toasts);
        },
        remainsLengthSystem(value) {
            if (value < 1000) {
                createToast({
                    name: 'Предупреждение', text: `Осталось ${value} мм для размещения треков`, alert: true, delay: 15000,
                }, this.toasts);
            }
        },
        totalLength() {
            this.setShapeOnStorage();
        },
    },
    methods: {
        ...mapMutations([
            // `this.functionName(value)` будет вызывать `this.$store.commit('functionName', value)`
            'updateShape',
            'updateSides',
            'updateLength',
            'updateAccessories',
            'updateSuspensionType',
        ]),
        reset_shape() {
            const sidesKeys = Object.keys(this.sides);
            sidesKeys.forEach(side => {
                this.sides[side].tracks = [];
                this.sides[side].side_total_length = 0;
                this.sides[side].side_total_tracks = 0;
            });

            this.updateSides(null);
            this.updateShape(null);
            this.setShapeOnStorage();
        },
        reset_suspension() {
            this.suspensionType = null;
        },
        resetStep() {
            this.reset_shape();
        },
        calcSideTracksCount(trackLenght) {
            return Math.ceil(trackLenght / TRACK_SIZE);
        },
        calcSideConnectors(sideTracks) {
            const connectors = sideTracks - 1;
            if (connectors < 1) {
                return 0;
            }

            return connectors;
        },
        showBtnsTooltip() {
            const element = this.$refs.tracksButtons[0];
            element.classList.add('tooltipShow');

            setTimeout(() => {
                element.classList.remove('tooltipShow');
            }, 500);
        },
        enterTrackSize() {
            this.customSizeModal.show();
        },
        handleSelectTab(e, index) {
            this.currentSide = Object.keys(this.sides)[index];
        },
        handleAddTrackButton(side, event) {
            const dataLength = +event.currentTarget.dataset.length;
            const scrollContainer = this.$refs.tracksOverview[0];

            this.addTrackToSide(side, dataLength);
            const scrollPosition = scrollContainer.scrollWidth + dataLength / 10;

            setTimeout(() => {
                scrollContainer.scroll({
                    top: 0,
                    left: scrollPosition,
                    behavior: 'smooth',
                });
            }, 400);
        },
        handleAddCustomTrack(side, trackSize) {
            this.addTrackToSide(side, trackSize);
            this.customSizeModal.hide();
        },
        configTrack(side, trackLenght) {
            const currentSide = this.sides[side];
            const newTrack = {
                index: currentSide.tracks.length,
                name: `${currentSide.name} - ${currentSide.tracks.length + 1}`,
                title: currentSide.title,
                type: currentSide.type,
                track_length: trackLenght,
                track_remains: trackLenght,
                track_lights: [],
            };
            currentSide.tracks.push(newTrack);

            currentSide.side_total_length += trackLenght;
            currentSide.side_total_tracks = this.calcSideTracksCount(currentSide.side_total_length);
            currentSide.side_connectors = this.calcSideConnectors(currentSide.tracks.length);

            if (currentSide.side_total_tracks === 0) {
                currentSide.side_total_tracks = 1;
            }

            this.totalLength += trackLenght;
        },
        addTrackToSide(side, trackLenght) {
            this.configTrack(side, trackLenght);
            this.duplicateTrack(side, trackLenght);
        },
        duplicateTrack(side, trackLenght) {
            if (this.shape !== 'shape-square') {
                return;
            }
            let mirrorSide;
            switch (side) {
            case 'side_A':
                mirrorSide = 'side_C';
                break;
            case 'side_B':
                mirrorSide = 'side_D';
                break;
            default:
                break;
            }
            this.configTrack(mirrorSide, trackLenght);
        },
        handleRemoveTrack(side, index, event) {
            const parent = event.target.closest('.track');
            parent.classList.add('for-remove');

            this.removeTrack(side, index);
            this.removeMirrorTrack(side, index);
            setTimeout(() => {
                parent.classList.remove('for-remove');
            }, 300);
        },
        removeTrack(side, index) {
            const currentSide = this.sides[side];
            const { tracks } = currentSide;
            const lengthForDelete = tracks[index].track_length;
            this.totalLength -= lengthForDelete;

            currentSide.side_total_length -= lengthForDelete;
            currentSide.side_total_tracks = this.calcSideTracksCount(currentSide.side_total_length);
            currentSide.side_connectors = this.calcSideConnectors(currentSide.tracks.length);

            setTimeout(() => {
                tracks.splice(index, 1);
                // Пересчет индексов
                tracks.forEach((track, idx) => {
                    track.index = idx;
                    track.name = `${currentSide.name} - ${idx + 1}`;
                });
            }, 300);
        },
        removeMirrorTrack(side, index) {
            if (this.shape !== 'shape-square') {
                return;
            }
            let mirrorSide;
            switch (side) {
            case 'side_A':
                mirrorSide = 'side_C';
                break;
            case 'side_B':
                mirrorSide = 'side_D';
                break;
            default:
                break;
            }

            this.removeTrack(mirrorSide, index);
        },
        trackLengthClass(value) {
            if (value <= 1000) {
                return 'small';
            }
            if (value <= 2000) {
                return 'medium';
            }
            return 'big';
        },
        setShapeOnStorage() {
            const stringifySides = JSON.stringify(this.sides);
            const stringifyShape = JSON.stringify(this.shape);
            sessionStorage.setItem('sides', stringifySides);
            sessionStorage.setItem('shape', stringifyShape);
        },
        updatecustomValue({ target: { value } }) {
            this.customValue = value > TRACK_SIZE ? TRACK_SIZE : +value;
            this.$forceUpdate();
        },
        pushNext(link) {
            const accsessoriesObject = {
                total_container_for_tracks: this.totalContainerForTracks,
                total_suspension: this.totalSuspension,
                corners: this.corners,
                total_connectors: this.totalConnectors,
                total_metalic_connectors: this.totalMetalicConnectors,
                stubs: this.stubs,
                is_smart_light: this.isSmartLight,
                is_power_adaptor: this.isPowerAdaptor,
            };

            const stringifyAccsessories = JSON.stringify(accsessoriesObject);
            sessionStorage.setItem('accessories', stringifyAccsessories);

            this.setShapeOnStorage();
            this.updateAccessories(accsessoriesObject);
            this.$router.push(link);
        },
    },
    created() {
        if (this.shape) {
            const { corners, sides, stubs } = SHAPE[this.shape];
            this.stubs = stubs;
            this.corners = corners;
            if (!this.sides) {
                this.sides = sides;
            }
        }

        smoothscroll.polyfill();
    },
    mounted() {
        this.customSizeModal = new Modal(this.$refs.sizeModal);
    },
};
</script>

<style lang="scss" scoped>
@import '../styles/scss/variables';
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.radio-group {
    &__item {
        position: relative;

        &::before {
            content: '';
            display: block;
            padding-top: 100%;
        }

        &:hover {
            label {
                background-color: $light_shades;

                 @include media-breakpoint-down(xxl) {
                    background-color: #fff;
                }
            }

            svg {
                filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
                transform: translate3d(-5px, -5px, 0);
            }
            svg path,
            svg rect {
                fill: #000;
            }
        }

        label {
            position: absolute;
            top: 0;
            left: 15px;
            right: 15px;
            bottom: 0;

            background-color: #fff;
            cursor: pointer;
        }

        svg {
            transition: transform 0.33s;
        }

        @include media-breakpoint-down(xxl) {
            margin-bottom: 2rem;
        }
    }
    &__title {
        position: absolute;
        top: 20px;
        font-family: BellGothic, $systemfont;
        font-weight: 600;
        text-transform: uppercase;

        @include media-breakpoint-down(xxl) {
          top: -5px;
        }
    }
}

.tracks {
    position: relative;

    &__overview {
        position: relative;

        display: flex;
        width: 100%;
        overflow-x: auto;

        background-color: #f2f2f2;

        small {
            position: absolute;
            left: 20px;

            font-size: 12px;
            color: #777;
        }
    }
    &__config {
         background-color: #d6d6d6;
    }
    &__buttons {
        gap: 15px;
        padding: 20px;
        flex-grow: 1;

        &.tooltipShow .btn {
            background-color: #fff;
        }

        @include media-breakpoint-down(xxl) {
           flex-direction: column;
        }
    }
    &__field {
        padding: 100px 125px;
    }
    &__length {
        position: absolute;
        right: 0;
        top: 0;

        font-weight: 600;

        @include media-breakpoint-down(xxl) {
            position: static;

            display: block;
            padding-top: 5px;
        }
    }

    .side-image {
        max-width: 64px;
        margin-left: 20px;
        margin-right: 20px;
    }
}

.track {
    position: relative;
    z-index: 10;

    display: flex;
    width: 400px;
    padding-top: 30px;
    margin-right: 5px;

    transition: transform 0.35s;

    &.small {
        width: 160px;
    }
    &.medium {
        width: 250px;
    }
    &--placeholder {
        width: 150px;
        font-size: 12px;

        .track__item {
            background-color: transparent;
            color: #000;
            border: 1px dashed #686868;
            cursor: pointer;
        }
    }
    &::after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 30px;
        left: 0;
        right: 0;
        bottom: 0;

        box-shadow: 0 0 10px 3px rgba(0,0,0, 0);
        transition: 0.35s;
    }
    &:hover::after {
        box-shadow: 0 0 10px 3px rgba(0,0,0,.75);
    }
    &--placeholder:hover::after {
        box-shadow: 0 0 10px 3px rgba(0,0,0,.07);
    }
    &:hover .track__delete {
        transform: translate3d(0, -3px, 0);
    }
    &.for-remove {
        opacity: 0.4;
        z-index: -1;
        pointer-events: none;

        transform: translate3d(50px, 0, 0);
    }
    &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        width: 100%;
        height: 45px;
        background-color: #000;
        color: #fff;
    }
    &__delete {
        position: absolute;
        z-index: 2;
        left: 0;
        right: 0;
        top: 0;

        display: block;
        width: 100%;
        height: 30px;

        background-color: $light_accent;
        box-shadow: none;
        border: none;
        filter: saturate(15%);
        transform: translate3d(0, 100%, 0);

        transition-property: opacity,transform;
        transition-duration: 0.35s;

        &:hover {
             filter: saturate(100%);
        }
    }
    @include media-breakpoint-down(xxl) {
        width: 270px;

    &.small {
        width: 150px;
    }
    &.medium {
        width: 220px;
    }
    }
}

.btn-track {
    position: relative;

    min-width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.725rem 0.9375rem;

    font-size: 0.875rem;
    font-weight: 600;

    border: 1px solid #000;
    border-radius: 0;

    transition-duration: 0.33s;
    transition-property: color, background-color;
    background-color: transparent;

    &__size-icon {
        position: absolute;
        bottom: 3px;
        left: 15px;
        width: 80px;
        height: 10px;
    }

    &:hover {
        background-color: #fff;
    }
}
</style>
<style src="vue-slim-tabs/themes/default.css"></style>
<style>
.vue-tablist {
    margin-bottom: 2px;
    border-color: #fff;
}
.vue-tab {
     animation: sideHint 1.2s ease-in-out 0.3s 2;
}
.vue-tab[aria-selected='true'] {
    background-color: #d6d6d6;
}

@keyframes sideHint {
    0% {
        background-color: #fff;
        color: #000;
    }
    50% {
        background-color: #000;
        color: #fff;
    }
    100% {
        background-color: #fff;
        color: #000;
    }
}
</style>
