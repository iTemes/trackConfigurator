<template>
    <section class="configurator-step">
        <h2 class="visually-hidden">
            Третий шаг - визуализация и добавление светильников
        </h2>
        <Header />

        <div class="container container--main">
            <div class="form-group">
                <h3 class="form-head">
                    Конфигурация светильников системы
                </h3>
                <div v-if="conFigError">
                    <p class="form-group__text">
                        Ссылка на конфигурацию больше не действительна
                    </p>
                    <router-link
                        to="/"
                        exact-path>
                        Вернуться к первому шагу
                    </router-link>
                </div>
                <div
                    v-else
                    class="d-flex align-items-center justify-content-between">
                    <p
                        class="form-group__text noprint"
                        v-if="isNoSides && !totalTracksCount">
                        Вы не добавили треки, вернитесь на второй шаг.
                    </p>
                    <p
                        v-else
                        class="form-group__text noprint">
                        Нажмите на нужный трек, чтобы добавить светильники.
                    </p>

                    <p class="form-group__text form-group__text--power">
                        Мощность системы: <span :class="{ 'danger': powerError }">{{ systemPower }}</span> / {{ powerSupply }} Вт
                    </p>
                </div>
                <section
                    class="system-visuall d-flex align-items-center justify-content-center" />
            </div>
            <transition name="slide-fade">
                <section
                    class="side-products"
                    ref="sideProducts"
                    v-if="currentTrack">
                    <header>
                        <div class="side-products__top-text d-flex justify-content-between">
                            <h2 class="side-products__title">
                                {{ currentTrack.name }}
                            </h2>
                            <button
                                class="side-products__close"
                                @click="closecurrentTrack">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M4.5 3.44l5.5 5.5 4.97-4.97a.75.75 0 1 1 1.06 1.06L11.06 10l4.97 4.97a.75.75 0 1 1-1.06 1.06L10 11.06l-5.5 5.5-1.06-1.06 5.5-5.5-5.5-5.5L4.5 3.44z"
                                        fill="#151528" />
                                </svg>
                            </button>
                        </div>
                        <p v-if="currentTrack.insertPower">
                            Блок питания на {{ powerSupply }} Вт встроен в  {{ currentTrack.name }}
                        </p>

                        <p>
                            Свободно:
                            <span :class="{ 'danger': isTrackFullLength }">
                                {{ currentTrack.track_remains }}
                            </span> мм из <b>{{ currentTrack.track_length }} мм</b>
                        </p>
                        <p
                            class="side-products__danger"
                            v-if="isTrackFullLength">
                            Достигнуто максимальное кол-во светильников в треке
                        </p>
                    </header>

                    <div class="side-products__wrapper d-flex align-items-start">
                        <transition-group
                            class="side-products__list d-flex flex-wrap"
                            name="slide-left"
                            tag="ul">
                            <li
                                class="side-products__item"
                                :class="{'for_remove' : product.needRemove}"
                                v-for="product in currentTrack.track_lights"
                                @click="handleLightDelete(product.uuid, product)"
                                :key="product.uuid">
                                <div
                                    class="card">
                                    <img
                                        :src="product.icon_image1"
                                        loading="lazy"
                                        class="img-responsive"
                                        width="400"
                                        height="400"
                                        alt="">
                                    <h4 class="card__title">
                                        {{ product.name }}
                                    </h4>
                                </div>
                                <!-- eslint-disable -->
                                <svg
                                    class="side-products__delete"
                                    width="48px"
                                    height="48px"
                                    style="enable-background:new 0 0 512 512;"
                                    fill="#fff"
                                    viewBox="0 0 512 512">
                                    <g>
                                        <g fill="#fff">
                                            <line x1="169.449" x2="342.551" y1="169.449" y2="342.551"/>
                                            <line x1="342.551" x2="169.449" y1="169.449" y2="342.551"/>
                                        </g>
                                        <g fill="#fff">
                                            <path d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"/></g></g><g id="expanded"><g><path d="M267.314,256l80.894-80.894c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256,244.686    l-80.894-80.894c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L244.686,256l-80.894,80.894    c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256,267.314l80.894,80.894    c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L267.314,256z"/><path d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"/>
                                        </g>
                                    </g>
                                </svg>
                            </li>
                        </transition-group>
                        <!-- eslint-enable -->
                        <div class="side-products__add">
                            <button
                                @click="searchTrackLight()"
                                :disabled="isTrackFullLength || powerError"
                                class="side-products__button d-flex flex-xl-column align-items-center justify-content-center">
                                <span>Добавить светильник</span>
                                <span>+</span>
                            </button>
                            <transition name="slide-left">
                                <div
                                    v-if="enableRelatedList"
                                    class="recently-items">
                                    <h4 class="recently-items__title">
                                        Недавно добавленные
                                    </h4>
                                    <ul class="recently-items__list">
                                        <li
                                            :key="item.id"
                                            v-for="item in relatedSubProducts">
                                            <button
                                                @click="addLightToTrack(item)"
                                                class="recently-items__button">
                                                <img
                                                    :src="item.icon_image1"
                                                    loading="lazy"
                                                    class="recently-items__image"
                                                    width="40"
                                                    height="40">
                                                <span class="recently-items__name">
                                                    {{ item.name }}
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                    <button
                                        @click="openAllTrackLights()"
                                        class="recently-items__button recently-items__button--all">
                                        <span class="recently-items__name">
                                            Весь список
                                        </span>
                                    </button>
                                </div>
                            </transition>
                        </div>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <div
                    class="product-popup"
                    @click.self="closeFilters"
                    v-if="enableProductList">
                    <filterList
                        @add_light="addLightToTrack"
                        @close_filters="closeFilters" />
                </div>
            </transition>

            <TableResult
                ref="tableResult"
                :show="showResult"
                :total-container-for-tracks="totalContainerForTracks"
                :total-suspension="totalSuspension"
                :corners="corners"
                :total-connectors="totalConnectors"
                :total-metalic-connectors="totalMetalicConnectors"
                :stubs="stubs"
                :is-smart-light="isSmartLight"
                :is-power-adaptor="isPowerAdaptor"
                :subproducts="serializeSubproductForTable"
                :total-tracks-count="totalTracksCount" />
            <div v-if="qrCode">
                <img
                    class="qr-code-img"
                    width="250"
                    height="250"
                    :src="qrCode"
                    alt="qr">
            </div>
        </div>

        <!-- Modal -->
        <div
            ref="sharedModal"
            class="modal fade"
            id="sharedModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5
                            class="modal-title"
                            id="exampleModalLabel">
                            Поделиться конфигурацией
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close" />
                    </div>
                    <form @submit.prevent>
                        <div class="modal-body">
                            <label
                                for="basic-url"
                                class="form-label">Ссылка:</label>
                            <div class="input-group input-group--copy mb-3">
                                <input
                                    ref="copyLink"
                                    class="form-control form-control--copy-link"
                                    type="text"
                                    aria-label="Disabled input example"
                                    disabled
                                    readonly
                                    v-model="configurationUrl">
                                <button
                                    type="button"
                                    class="btn btn-default btn-copy js-tooltip js-copy"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    :data-copy="configurationUrl"
                                    @click="copyToClipBoard"
                                    title="Copy to clipboard">
                                    <svg
                                        class="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                                    </svg>
                                </button>
                            </div>
                            <label
                                for="basic-url"
                                class="form-label">Отправить на почту:</label>
                            <div class="form-floating mb-3">
                                <input
                                    @input="checkValidityInput"
                                    ref="sharedEmailInput"
                                    v-model="sharedEmail"
                                    type="email"
                                    class="form-control"
                                    id="floatingInput"
                                    required
                                    placeholder="name@example.com">
                                <label for="floatingInput">Email:</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Отмена
                            </button>
                            <button
                                class="btn btn-dark"
                                type="submit"
                                @click="sendEmail($event)">
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Toasts -->
        <div
            class="toast-relative noprint"
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
            @push_next="finishConfig"
            :reset-step-enalbe="false"
            :finished="showResult">
            <div v-if="showResult">
                <button
                    @click.prevent="printTable"
                    class="btn btn-outline-dark">
                    Печать
                </button>
                <button
                    @click.prevent="shareConfig"
                    class="btn btn-outline-dark">
                    Поделиться
                </button>
                <button
                    @click.prevent="buildOrder"
                    class="btn btn-dark">
                    Заказать
                </button>
            </div>
        </Footer>
    </section>
</template>

<script>
import { SVG } from '@svgdotjs/svg.js';
import { v4 as uuidv4 } from 'uuid';
import smoothscroll from 'smoothscroll-polyfill';
import { Tooltip, Modal } from 'bootstrap';
import { mapState, mapMutations } from 'vuex';
import filterList from '../components/Filter/filter.vue';
import TableResult from '../components/TableResult/TableResult.vue';
import Footer from '../components/Footer/Footer.vue';
import Header from '../components/Header/Header.vue';
import ToastVue from '../components/Toast/ToastVue.vue';
import createToast from '../utils/toasts';
import {
    TRACK_SIZE,
    VER_TRACK_WIDTH,
    VER_TRACK_HEIGHT,
    HOR_TRACK_WIDTH,
    HOR_TRACK_HEIGHT,
    TRACK_OFFSET,
    MAX_CANVAS_HEIGHT,
    VER_TYPE,
    VER_TYPE_REVERS,
    HOR_TYPE,
    HOR_TYPE_REVERS,
    POWER_SUPPLY,
    ACCESSORIES_CART_ID,
} from '../utils/constans';

export default {
    components: {
        filterList, TableResult, Footer, ToastVue, Header,
    },
    data() {
        return {
            startX: 75,
            startY: 100,
            enableProductList: false,
            enableRelatedList: false,
            subproductList: [],
            tracks: {},
            currentTrack: null,
            draw: null,
            defs: null,
            sideA: null,
            sideB: null,
            sideC: null,
            sideD: null,
            showResult: false,
            postFromServer: null,
            qrCode: null,
            config_key: null,
            keyTolink: '',
            conFigError: false,
            sideError: false,
            powerError: false,
            sharedModal: null,
            sharedEmail: '',
            postConfigObject: null,
            toasts: [],
        };
    },
    watch: {
        powerSupply(newVal) {
            createToast({ text: `Блок питания изменен на ${newVal} Вт` }, this.toasts);
        },
        systemPower(newVal) {
            if (newVal > this.powerSupply) {
                this.powerError = true;
            } else this.powerError = false;
        },
    },
    computed: {
        ...mapState({
            shapeFromStore: 'shape',
            sidesFromStore: 'sides',
            totalLengthFromStore: 'total_length',
            controlPlaceFromStore: 'control_place',
            colorFromStore: 'system_color',
            typeFromStore: 'control_type',
            mountingFromStore: 'system_mounting',
            powerSupplyFromStore: 'power_supply',
            accsessoriesFromStore: 'accessories',
            tracksCountFromStore: 'total_tracks',
            suspensionTypeFromStore: 'suspension_type',
            cartIdFromStore: 'cart_id',
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
        systemPower() {
            let power = 0;
            if (!this.subproductList.length) {
                return power;
            }

            this.subproductList.forEach(({ features }) => {
                if (!features) return;
                power += +features.power.value;
            });
            return power;
        },
        powerSupply() {
            let powerSupValue = 86;
            let powerSupList = POWER_SUPPLY[this.controlPlaceFromStore];
            const systemColor = this.colorFromStore;

            if (!powerSupList) {
                return powerSupValue;
            }
            if (this.controlPlaceFromStore !== 'external-control') {
                powerSupList = powerSupList.filter(item => item.color === systemColor);
            }

            // eslint-disable-next-line no-restricted-syntax
            for (const supply of powerSupList) {
                if (this.systemPower < supply.value) {
                    powerSupValue = supply.value;
                    this.updatePowerSupply(supply);

                    return powerSupValue;
                }
            }
            if (this.systemPower > powerSupValue) {
                createToast({
                    name: 'Предупреждение',
                    text: 'Превышена допустимая максимальная мощность системы для встроенного блока питания. Необходимо уменьшить кол-во светильников или выбрать внешний блок питания на первом шаге',
                    autohide: false,
                    alert: true,
                }, this.toasts);
                return 250;
            }

            return powerSupValue;
        },
        isTrackFullLength() {
            if (this.currentTrack?.track_remains <= 250) {
                return true;
            }

            return false;
        },
        relatedSubProducts() {
            // Находим уникальные объекты по id из 1С
            let unicArrFromObjects = this.subproductList.reduce((acc, item) => {
                acc[item.id] = item;

                return acc;
            }, {});

            unicArrFromObjects = Object.keys(unicArrFromObjects).map(id => unicArrFromObjects[id]);

            return unicArrFromObjects;
        },
        serializeSubproductForTable() {
            let unicArrFromObjects = this.subproductList.reduce((acc, item) => {
                if (acc[item.id]) {
                    item.count = acc[item.id].count + 1;
                    acc[item.id] = item;

                    return acc;
                }
                item.count = 1;
                acc[item.id] = item;

                return acc;
            }, {});
            unicArrFromObjects = Object.keys(unicArrFromObjects).map(id => unicArrFromObjects[id]);

            return unicArrFromObjects;
        },
        isNoSides() {
            if (!this.sides) {
                return true;
            }
            return false;
        },
        totalTracksCount() {
            let totalCount = 0;
            Object.keys(this.tracks).forEach(sideTracks => {
                this.tracks[sideTracks].forEach(track => {
                    totalCount += track.track_length;
                });
            });
            return Math.ceil(totalCount / TRACK_SIZE);
        },
        totalContainerForTracks() {
            return this.accsessoriesFromStore?.total_container_for_tracks || 0;
        },
        totalSuspension() {
            return this.accsessoriesFromStore?.total_suspension || 0;
        },
        corners() {
            return this.accsessoriesFromStore?.corners || 0;
        },
        totalConnectors() {
            return this.accsessoriesFromStore?.total_connectors || 0;
        },
        totalMetalicConnectors() {
            return this.accsessoriesFromStore?.total_metalic_connectors || 0;
        },
        stubs() {
            return this.accsessoriesFromStore?.stubs || 0;
        },
        isSmartLight() {
            return this.accsessoriesFromStore?.is_smart_light || 0;
        },
        isPowerAdaptor() {
            return this.accsessoriesFromStore?.is_power_adaptor || 0;
        },
        nextStep() {
            if (!this.subproductList.length || this.sideError || this.powerError) {
                return false;
            }

            return true;
        },
        configurationUrl() {
            const locationKey = this.keyTolink || this.config_key;
            return `https://www.centrsvet.ru/inf_configurator/thirdStep?config_key=${locationKey}`;
        },
    },
    methods: {
        ...mapMutations([
            // `this.functionName(value)` будет вызывать `this.$store.commit('functionName', value)`
            'updateSides',
            'updateShape',
            'updatePowerSupply',
            'updateAccessories',
            'updateControlPlace',
            'updateControlType',
            'updateColor',
            'updateMounting',
            'updateCartId',
        ]),
        createTrackRect(type, width, height, group, ofsset, track) {
            let RectHeight = height;
            let RectWidth = width;
            // console.log('RectWidth', RectWidth);
            // console.log('RectHeight', RectHeight);
            switch (type) {
            case 'HOR':
                RectWidth = this.calcRectangleWidthFromLength(width);
                break;
            case 'HOR-REVERS':
                RectWidth = this.calcRectangleWidthFromLength(width);
                this.startX -= RectWidth + ofsset;
                break;
            case 'VER':
                RectHeight = this.calcRectangleWidthFromLength(height);
                break;
            case 'VER-REVERS':
                RectHeight = this.calcRectangleWidthFromLength(height);
                this.startY -= RectHeight + ofsset;
                break;
            default:
                break;
            }
            const trackWrapper = group.group().attr(
                {
                    class: 'g-track-wrapper',
                    'data-index': track.index,
                    'data-title': track.title,
                },
            );
            const trackItem = trackWrapper.rect(RectWidth, RectHeight).attr(
                {
                    fill: '#7f7f7f',
                    x: this.startX,
                    y: this.startY,
                    class: 'g-track',
                    title: track.name,
                    'data-name': track.name,
                    'data-index': track.index,
                    'data-title': track.title,
                    'data-length': track.track_length,

                    'data-bs-toggle': 'tooltip',
                },
            );

            trackWrapper.on('click', this.trackClickHandler);

            switch (type) {
            case 'HOR':
                this.startX += RectWidth + ofsset;
                break;
            case 'VER':
                this.startY += RectHeight + ofsset;
                break;
            default:
                break;
            }

            return trackItem;
        },
        calcRectangleWidthFromLength(value) {
            if (value <= 1000) {
                return 100;
            }
            if (value <= 2000) {
                return 200;
            }
            return HOR_TRACK_WIDTH;
        },
        recalcCircleCoords(group, name, type) {
            const svgRect = document.querySelector(`rect[data-name='${name}']`);
            const circleArray = group.find('circle');

            circleArray.forEach((circle, index) => {
                let xCoord = +svgRect.getAttribute('x');
                let yCoord = +svgRect.getAttribute('y');

                if (type === 'vertical') {
                    xCoord -= 30;
                    yCoord += ((index + 1) * 25);
                } else if (type === 'horizont-top') {
                    xCoord += ((index + 1) * 25);
                    yCoord -= 30;
                } else {
                    xCoord += ((index + 1) * 25);
                    yCoord += 60;
                }

                circle.attr(
                    {
                        cx: xCoord,
                        cy: yCoord,
                    },
                );
            });
        },
        createLightCircle(group, x, y, imagePath, type, lightsCount, id, name) {
            let xCoord = +x;
            let yCoord = +y;

            if (type === 'vertical') {
                xCoord -= 30;
                yCoord += (lightsCount * 25);
            } else if (type === 'vertical-left') {
                xCoord += 60;
                yCoord += (lightsCount * 25);
            } else if (type === 'horizont-top') {
                xCoord += (lightsCount * 25);
                yCoord -= 30;
            } else {
                xCoord += (lightsCount * 25);
                yCoord += 60;
            }
            const lightCircleItem = group.circle(40).attr(
                {
                    stroke: '#acacac',
                    'stroke-width': 2,
                    fill: '#000',
                    cx: xCoord,
                    cy: yCoord,
                    class: 'circle',
                    title: name,
                    'data-id': id,
                },
            );
            const pattern = this.defs.pattern(40, 40).attr(
                {
                    width: 40,
                    height: 40,
                    x: 0,
                    y: 0,
                    patternUnits: 'objectBoundingBox',
                },
            );
            lightCircleItem.fill(pattern);
            pattern.image(`https://st.centrsvet.ru/40x40_fit_90/${imagePath}`).attr(
                {
                    width: 40,
                    height: 40,
                    x: 0,
                    y: 0,
                },
            );
            lightCircleItem.fill(pattern);

            const nodeCircle = new Tooltip(lightCircleItem.node);
            return nodeCircle;
        },
        calculateCanvasWidth(side, trackWidth) {
            const { tracks } = { ...side };
            if (!tracks) {
                return 0;
            }

            if (tracks.length >= 3) {
                return tracks.length * trackWidth + 300;
            }

            if (tracks.length > 1) {
                return 700;
            }
            return 460;
        },
        calculateCanvasHeight(side, trackHeight) {
            const { tracks } = { ...side };
            if (!tracks) {
                return 350;
            }

            if (tracks.length >= 2) {
                return tracks.length * trackHeight + 300;
            }

            return 450;
        },
        trackClickHandler({ currentTarget }) {
            if (this.showResult) {
                return;
            }
            this.tracksRemoveActive();
            this.currentTrack = null;
            currentTarget.classList.add('active');

            const { dataset: { title, index } } = currentTarget;
            setTimeout(() => {
                this.currentTrack = this.tracks[title][index];
            }, 200);
            setTimeout(() => {
                const refTotrack = this.$refs?.sideProducts?.offsetTop;

                window.scrollTo({
                    top: refTotrack,
                    behavior: 'smooth',
                });
            }, 600);
        },
        tracksRemoveActive() {
            const tracks = document.querySelectorAll('.g-track-wrapper');
            tracks.forEach(track => track.classList.remove('active'));
        },
        searchTrackLight() {
            if (!this.relatedSubProducts.length) {
                this.openAllTrackLights();
            } else this.enableRelatedList = true;
        },
        openAllTrackLights() {
            this.enableProductList = true;
            this.enableRelatedList = false;
        },
        addLightToTrack(subproduct, track = this.currentTrack) {
            const copySubproduct = { ...subproduct };

            const {
                title, index, name, type,
            } = track;

            const lightId = uuidv4();
            copySubproduct.uuid = lightId;
            const svgRect = document.querySelector(`rect[data-name='${name}']`);
            const xRect = svgRect.getAttribute('x');
            const yRect = svgRect.getAttribute('y');

            const lightsCount = track.track_lights.length + 1;
            const groupByIndex = this[title].findOne(`g[data-index='${index}']`);
            const Lightdimension = copySubproduct.features.dimension ? +copySubproduct.features.dimension.value : 100;

            if (track.track_remains < Lightdimension) {
                svgRect.classList.add('full');

                this.enableProductList = false;
                this.enableRelatedList = false;
                this.sideError = true;
                copySubproduct.needRemove = true;
                createToast({
                    name: 'Предупреждение', text: `Превышено максимальное кол-во светильников в '${name}'!`, autohide: false, alert: true,
                }, this.toasts);
            }
            track.track_remains -= Lightdimension;
            if (track.track_remains <= 50) {
                svgRect.classList.add('full');
            } else svgRect.classList.remove('full');

            copySubproduct.groupByIndex = index;
            copySubproduct.xRect = xRect;
            copySubproduct.yRect = yRect;
            copySubproduct.type = type;
            copySubproduct.lightsCount = lightsCount;
            copySubproduct.title = title;

            track.track_lights.push(copySubproduct);
            this.subproductList.push(copySubproduct);
            this.createLightCircle(
                groupByIndex,
                xRect,
                yRect,
                copySubproduct.icon_image1,
                type,
                lightsCount,
                lightId,
                copySubproduct.name,
            );
            this.enableProductList = false;
            this.enableRelatedList = false;

            this.setSideOnStorage();
        },
        handleLightDelete(id, { features }) {
            const {
                title, index, name, type,
            } = this.currentTrack;

            const svgRect = document.querySelector(`rect[data-name='${name}']`);
            const circleForDelete = document.querySelector(`circle[data-id='${id}'`);
            const groupByIndex = this[title].findOne(`g[data-index='${index}']`);
            const Lightdimension = features.dimension ? +features.dimension.value : 100;

            circleForDelete.remove();
            this.currentTrack.track_remains += Lightdimension;
            this.subproductList = this.subproductList.filter(({ uuid }) => uuid !== id);
            this.currentTrack.track_lights = this.currentTrack.track_lights.filter(({ uuid }) => uuid !== id);
            this.recalcCircleCoords(groupByIndex, name, type);

            if (this.currentTrack.track_remains > 150) {
                svgRect.classList.remove('full');
                this.sideError = false;
            }

            this.setSideOnStorage();
        },
        closeFilters() {
            this.enableProductList = false;
            this.enableRelatedList = false;
        },
        closecurrentTrack() {
            this.currentTrack = null;
        },
        setSideOnStorage() {
            const stringifyObject = JSON.stringify(this.sides);
            sessionStorage.setItem('sides', stringifyObject);
        },
        resetStep() {
            alert('Вы действительно хотите сбросить изменения?');
        },
        finishConfig() {
            this.showResult = true;
            this.currentTrack = null;

            setTimeout(() => {
                const refToTable = this.$refs?.tableResult?.$el.offsetTop;

                window.scrollTo({
                    top: refToTable,
                    behavior: 'smooth',
                });
            }, 600);

            if (this.config_key) {
                return;
            }
            const configDetails = {
                control_place: this.controlPlaceFromStore,
                system_color: this.colorFromStore,
                control_type: this.typeFromStore,
                system_mounting: this.mountingFromStore,
            };
            const appData = {
                accsessories: this.accsessoriesFromStore,
                shape: this.shapeFromStore,
                // eslint-disable-next-line comma-dangle
                sides: this.sidesFromStore,
                configDetails,
            };
            this.postConfigObject = { ...appData };
            this.postConfigToServer(appData);
        },
        printTable() {
            this.currentTrack = null;
            setTimeout(() => {
                window.print();
            }, 450);
        },
        shareConfig() {
            this.sharedModal.show();
        },
        checkValidityInput(evt) {
            evt.target.setCustomValidity('');
        },
        sendEmail() {
            const validity = this.$refs.sharedEmailInput.checkValidity();

            if (validity) {
                const putEmailObject = {
                    config_key: this.keyTolink,
                    target_email: this.sharedEmail,
                    object_configurator: this.postConfigObject,
                };
                fetch('/expand_settings/api/saver_configurator/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(putEmailObject),
                })
                    .catch(error => {
                        throw new Error(error);
                    });
                this.sharedModal.hide();
                const toast = {
                    text: `Конфигурация отправлена на ${this.sharedEmail}`,
                };
                createToast(toast, this.toasts);
            } else {
                this.$refs.sharedEmailInput.focus();
                this.$refs.sharedEmailInput.setCustomValidity('Неправильный формат email адреса');
            }
        },
        async buildOrder(evt) {
            const mockObjToAccsessories = ACCESSORIES_CART_ID[this.mountingFromStore][this.colorFromStore];

            await this.createCartSubproduct()
                .then(response => response.json())
                .then(response => {
                    this.updateCartId(response.cart?.unique_id);
                    if (response.cart.unique_id) {
                        sessionStorage.setItem('cart_id', response.cart.unique_id);
                    }
                });
            await this.prepareTracksForOrder(mockObjToAccsessories);
            await this.prepareAccessoriesForOrder(this.accsessoriesFromStore, mockObjToAccsessories);
            await this.serializeSubproductForTable.forEach(subproduct => {
                this.orderSubproduct(subproduct);
            });
            evt.target.disabled = true;
            // window.open('/cartproject/show_project/', '_blank');
            setTimeout(() => {
                this.$router.push('/configurator_cart');
            }, 500);
        },
        prepareTracksForOrder(mockObjToAccsessories) {
            const pseudoSubproduct = { ...mockObjToAccsessories.track, count: this.totalTracksCount };
            this.orderSubproduct(pseudoSubproduct);
        },
        prepareAccessoriesForOrder(accsessories, mockObjToAccsessories) {
            // Блок питания
            if (this.powerSupplyFromStore) {
                const pseudoSubproduct = {
                    ...this.powerSupplyFromStore,
                    count: 1,
                };

                this.orderSubproduct(pseudoSubproduct);
            }

            Object.keys(accsessories).forEach(key => {
                // Угловые соеденители
                if (key === 'corners') {
                    const pseudoSubproduct = { ...mockObjToAccsessories.corner_connector, count: Number(accsessories[key]) };
                    this.orderSubproduct(pseudoSubproduct);
                }
                // Подвесы
                if (this.mountingFromStore === 'suspended' && key === 'total_suspension') {
                    const suspType = this.suspensionType ? this.suspensionType : 'suspension-tros';

                    const pseudoSubproduct = {
                        ...mockObjToAccsessories.total_suspension[suspType],
                        count: Number(accsessories[key]),
                    };

                    const pseudoSubproductClips = {
                        ...mockObjToAccsessories.suspension_clips,
                        count: Number(accsessories[key]),
                    };

                    this.orderSubproduct(pseudoSubproduct);
                    this.orderSubproduct(pseudoSubproductClips);

                    return;
                }
                // Натяжной потолок
                if (this.mountingFromStore === 'stretch-ceiling' && key === 'total_container_for_tracks') {
                    const pseudoSubproduct = {
                        ...mockObjToAccsessories.canal_caps,
                        count: Number(accsessories[key]),
                    };
                    this.orderSubproduct(pseudoSubproduct);
                }
                // Прочие аксессуары
                if (accsessories[key]) {
                    const pseudoSubproduct = { ...mockObjToAccsessories[key], count: Number(accsessories[key]) };
                    this.orderSubproduct(pseudoSubproduct);
                }
            });
        },
        orderSubproduct({ id, slug = '', count }) {
            /* объект для сохранения в корзину */
            const data = {
                object_id: id,
                object_type: 'subproduct',
                link: slug,
                quantity: count,
                second: 'config',
            };

            const apiUrl = '/cartproject/api/project';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(data),
            })
                .then(result => result.json())
                .then(result => {
                    localStorage.setItem('total_price', result.cart.total_price);
                    localStorage.setItem('total_quantity', result.cart.total_quantity);
                    // window.counter_click('YA_ADD_ORDER'); TODO CONFIG COUNTER
                })
                .catch(error => {
                    throw new Error(error);
                });
        },
        createCartSubproduct() {
            return fetch('/cartproject/api/project', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams({ second: 'config' }),
            });
        },
        postConfigToServer(configObject) {
            fetch('/expand_settings/api/saver_configurator/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(configObject),
            })
                .then(response => response.json())
                .then(response => {
                    this.qrCode = response.qrcode_url;
                    this.keyTolink = response.config_key;
                })
                .catch(error => {
                    throw new Error(error);
                });
        },
        getConfigFromServer(key) {
            fetch(`/expand_settings/api/saver_configurator/?config_key=${key}`)
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        throw new Error(response.error);
                    }

                    const {
                        accsessories, shape, sides, configDetails,
                    } = response.configurator;
                    /* eslint-disable camelcase */
                    const {
                        control_place, control_type, system_color, system_mounting,
                    } = { ...configDetails };

                    this.updateAccessories(accsessories);
                    this.updateShape(shape);
                    this.updateSides(sides);
                    this.updateControlPlace(control_place);
                    this.updateControlType(control_type);
                    this.updateColor(system_color);
                    this.updateMounting(system_mounting);

                    this.initDraw();
                    this.$forceUpdate();
                })
                .catch(error => {
                    this.handleConfigError(error);
                });
        },
        updateFromLocationHash() {
            const windowData = this.$route.query;

            // eslint-disable-next-line no-restricted-syntax
            Object.keys(windowData).forEach(key => {
                this.config_key = windowData[key];
            });
            if (this.config_key) {
                this.getConfigFromServer(this.config_key);
            }
        },
        handleConfigError() {
            this.conFigError = true;
        },
        reDrawCirclesAfterReload(track) {
            track.track_lights.forEach(light => {
                const groupByIndex = this[light.title].findOne(`g[data-index='${light.groupByIndex}']`);
                this.subproductList.push(light);
                this.createLightCircle(
                    groupByIndex,
                    light.xRect,
                    light.yRect,
                    light.icon_image1,
                    light.type,
                    light.lightsCount,
                    light.uuid,
                    light.name,
                );
            });
        },
        drawSides(...args) {
            // TODO
            console.log(args);
        },
        initDraw() {
            /* eslint-disable camelcase */
            /* eslint-disable no-unused-expressions */
            if (!this.sides) {
                return;
            }
            const {
                side_A, side_B, side_C, side_D,
            } = { ...this.sides };

            // Формируем список треков со всех сторон для отрисовки
            side_A?.tracks && (this.tracks = { [side_A.title]: [...side_A.tracks] });
            side_B?.tracks && (this.tracks = { ...this.tracks, [side_B.title]: [...side_B.tracks] });
            side_C?.tracks && (this.tracks = { ...this.tracks, [side_C.title]: [...side_C.tracks] });
            side_D?.tracks && (this.tracks = { ...this.tracks, [side_D.title]: [...side_D.tracks] });
            // Расчет размеров канваса SVG
            const canvasWidth = this.calculateCanvasWidth(side_B, HOR_TRACK_WIDTH);
            let viewBoxHeight;

            if (side_C && side_C.tracks.length > side_A.tracks.length) {
                viewBoxHeight = this.calculateCanvasHeight(side_C, VER_TRACK_HEIGHT);
            } else {
                viewBoxHeight = this.calculateCanvasHeight(side_A, VER_TRACK_HEIGHT);
            }

            const canvasHeight = viewBoxHeight > MAX_CANVAS_HEIGHT ? MAX_CANVAS_HEIGHT : viewBoxHeight;

            // Добавляем объекты SVG в дата, для доступа из методов
            this.draw = SVG().addTo('.system-visuall').size(canvasWidth, canvasHeight);
            this.draw.attr('viewBox', `0 0 ${canvasWidth} ${viewBoxHeight}`);
            this.defs = this.draw.defs();
            this.sideA = this.draw.group().attr('data-side', 'sideA');
            this.sideB = this.draw.group().attr('data-side', 'sideB');
            this.sideC = this.draw.group().attr('data-side', 'sideC');
            this.sideD = this.draw.group().attr('data-side', 'sideD');

            // TODO REFACTOR DRAW SIDES
            // this.drawSides(side_A, side_B, side_C, side_D);
            if (side_C && side_C.side_total_length > side_A.side_total_length) {
                // если 3-я сторона длинне, начинем отрисовку от нее
                // смещаем ее отрисовку на длинну второй стороны
                this.startX = side_B.tracks.reduce((acc, track) => {
                    const length = this.calcRectangleWidthFromLength(track.track_length) + TRACK_OFFSET;
                    // eslint-disable-next-line
                    return acc += length;
                }, 50);

                side_C && side_C.tracks.forEach(track => {
                    this.createTrackRect(
                        VER_TYPE,
                        VER_TRACK_WIDTH,
                        track.track_length,
                        this.sideC,
                        TRACK_OFFSET,
                        track,
                    );

                    this.reDrawCirclesAfterReload(track);
                });

                // Вторая сторона
                // Нужно знать конец третьей стороны
                // смещение по оси Х для начала отрисовки
                this.startX += HOR_TRACK_HEIGHT + TRACK_OFFSET;
                side_B && side_B.tracks.forEach(track => {
                    this.createTrackRect(
                        HOR_TYPE_REVERS,
                        track.track_length,
                        HOR_TRACK_HEIGHT,
                        this.sideB,
                        TRACK_OFFSET,
                        track,
                    );
                    this.reDrawCirclesAfterReload(track);
                });

                // Первая сторона
                // Нужно отрисовывать после второй
                side_A && side_A.tracks.forEach(track => {
                    this.createTrackRect(
                        VER_TYPE_REVERS,
                        VER_TRACK_WIDTH,
                        track.track_length,
                        this.sideA,
                        TRACK_OFFSET,
                        track,
                    );

                    this.reDrawCirclesAfterReload(track);
                });
            } else {
                // Первая сторона
                side_A && side_A.tracks.forEach((track, idx) => {
                    this.createTrackRect(
                        VER_TYPE,
                        VER_TRACK_WIDTH,
                        track.track_length,
                        this.sideA,
                        TRACK_OFFSET,
                        track,
                    );
                    if (idx === 0 && this.controlPlaceFromStore === 'integrated-control') {
                        if (track.track_remains > 300) {
                            track.insertPower = true;
                            track.track_remains -= 300;
                        }
                    }
                    // Повторая отрисовка иконок светильников
                    this.reDrawCirclesAfterReload(track);
                });

                // Вторая сторона
                // Нужно знать конец первой стороны
                side_B && side_B.tracks.forEach(track => {
                    this.createTrackRect(
                        HOR_TYPE,
                        track.track_length,
                        HOR_TRACK_HEIGHT,
                        this.sideB,
                        TRACK_OFFSET,
                        track,
                    );

                    this.reDrawCirclesAfterReload(track);
                });

                // Третья сторона
                // Нужно знать конец второй стороны
                this.startX -= VER_TRACK_WIDTH + TRACK_OFFSET;
                side_C && side_C.tracks.forEach(track => {
                    this.createTrackRect(
                        VER_TYPE_REVERS,
                        VER_TRACK_WIDTH,
                        track.track_length,
                        this.sideC,
                        TRACK_OFFSET,
                        track,
                    );

                    this.reDrawCirclesAfterReload(track);
                });

                // Четвертая сторона
                // Копия второй снизу
                // смещение по оси Х для начала отрисовки
                this.startX = 75;
                this.startY -= VER_TRACK_WIDTH + TRACK_OFFSET;
                side_D && side_D.tracks.forEach(track => {
                    this.createTrackRect(
                        HOR_TYPE,
                        track.track_length,
                        HOR_TRACK_HEIGHT,
                        this.sideD,
                        TRACK_OFFSET,
                        track,
                    );

                    this.reDrawCirclesAfterReload(track);
                });
            }
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipTriggerList.forEach(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
        },
        copyToClipBoard() {
            const copyTest = document.queryCommandSupported('copy');
            if (copyTest === true) {
                const copyLinkInput = this.$refs.copyLink;
                copyLinkInput.focus();
                copyLinkInput.select();
                // Overwrite what is being copied to the clipboard.
                document.addEventListener('copy', e => {
                    e.clipboardData.setData('text/plain', copyLinkInput.value);
                    e.preventDefault();
                });

                try {
                    // eslint-disable-next-line no-unused-vars
                    const successful = document.execCommand('copy');
                    copyLinkInput.classList.add('copied');
                } catch (err) {
                    throw new Error('Oops, unable to copy');
                }
            } else {
                // Fallback if browser doesn't support .execCommand('copy')
                // eslint-disable-next-line no-alert
                window.prompt('Copy to clipboard: Ctrl+C or Command+C, Enter', this.configurationUrl);
            }
        },
    },
    mounted() {
        this.initDraw();
        this.sharedModal = new Modal(this.$refs.sharedModal);
    },
    created() {
        this.updateFromLocationHash();

        // Отрисовка данных из sessionStorage, если оригинал конфигурации
        if (!this.sides && !this.config_key) {
            const parseJson = JSON.parse(sessionStorage.getItem('sides'));
            this.updateSides(parseJson);
        }
        if (!this.shape && !this.config_key) {
            const shapeFromSession = JSON.parse(sessionStorage.getItem('shape'));
            this.updateShape(shapeFromSession);
        }

        if (!this.accsessoriesFromStore && !this.config_key) {
            const accessoriesFromSession = JSON.parse(sessionStorage.getItem('accessories'));

            this.updateAccessories(accessoriesFromSession);
        }
        smoothscroll.polyfill();
    },
};
</script>

<style lang="scss" scoped>
    @import '../styles/scss/variables';
    @import '../styles/scss/mixins';
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";
    // Slide fade
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition-property: opacity, transform;
        transition-duration: 0.35s;
    }

    .slide-fade-enter-active {
        transition-delay: 0.15s;
    }

    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translate3d(0, 100%, 0);
        opacity: 0;
    }
    // Slide Left
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition-property: opacity, transform;
        transition-duration: 0.45s;
    }

    .slide-left-enter-active {
        transition-delay: 0.15s;
    }

    .slide-left-enter,
    .slide-left-leave-active {
        transform: translate3d(20%, 0, 0);
        opacity: 0;
    }

    .side-products {
        padding: 1rem;
        width: 100%;
        margin-bottom: 100px;

        box-shadow: 0 2px 4px rgba(0,0,0,.16);

        &__wrapper {
            width: 100%;
            padding-right: 300px;

            @include media-breakpoint-down(md) {
                padding: 0;
                flex-direction: column;
            }
        }
        &__list {
            padding: 0;
            list-style: none;
        }
        &__item {
            position: relative;

            max-width: 230px;
            margin-right: 10px;
            margin-bottom: 20px;

            cursor: pointer;

            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.11);

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                background-color: rgba(0,0,0,0);
                transition: 0.35s;
            }

            &:hover,
            &.for_remove {
                &::after {
                    background-color: rgba(0,0,0,.36);
                }
                .side-products__delete {
                    display: block;
                }
            }

             @include media-breakpoint-down(md) {
                 max-width: 30%;
             }
        }
        &__delete {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            display: none;
        }
        &__close {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;

            background-color: transparent;
            border: 1px solid #fff;
            transition: 0.3;

            &:hover {
                border-color: #000;
            }
        }
        &__add {
            position: relative;

            @include media-breakpoint-down(md) {
                min-height: auto;
                width: 100%;
            }
        }
        &__button {
            @include resetBtnStyle;

            min-height: 210px;
            min-width: 190px;
            padding: 1rem;

            background-color: $light_accent;

            &:disabled {
                cursor: not-allowed;
            }

            @include media-breakpoint-down(md) {
                min-height: auto;
                width: 100%;
                min-width: 100%;
            }
        }
        &__danger {
            color: #DC3545;
        }
    }
    .card {
        &__title {
            margin-top: 15px;
            padding-left: 10px;
            font-size: 0.775rem;

            @include media-breakpoint-down(md) {
                font-size: 0.675rem;
            }
        }
    }
    .product-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;

        padding-bottom: 50px;
        padding-top: 100px;
        z-index: 1000;

        background-color: rgba(0,0,0,.36);
        outline: none;

        @include media-breakpoint-down(md) {
             padding-top: 0px;
        }
    }
    .recently-items {
        position: absolute;
        top: 0;
        left: 220px;
        z-index: 1;

        width: 250px;

        background-color: #fff;
        border: 1px solid rgba(0,0,0,.15);

        &__title {
            padding: 10px;

            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;

            border-bottom: 1px solid #dee2e6;
        }

        &__list {
            padding-left: 10px;

            list-style: none;

            li {
                margin-bottom: 4px;

                :hover {
                    background-color: #f8f9fa;
                }
            }
        }

        &__button {
            @include resetBtnStyle;

            display: flex;
            align-items: center;
            justify-content: space-between;

            &--all {
                width: 100%;
                justify-content: center;

                text-align: center;
                padding: .625rem .9375rem;
                font-size: .875rem;
                font-weight: 600;
                text-transform: uppercase;
                line-height: 1.5;
                color: #fff;

                background-color: rgb(108, 117, 125);
                border: 1px solid rgb(108, 117, 125);

                .recently-items__name {
                    text-align: center;
                    font: inherit;
                }
            }

        }

        &__image {
            width: 40%;
        }

        &__name {
            width: 55%;
            font-size: 0.65rem;
            font-weight: 500;
            text-align: left;
        }

        @include media-breakpoint-down(md) {
            top: unset;
            bottom: 0;
            left: 0;

            width: 100%;
        }
    }
    .qr-code-img {
        max-width: 250px;
    }
    .input-group--copy {
        .form-control--copy-link {
            padding-right: 55px;
            &.copied {
                opacity: 0.6;
            }
            &.copied + .btn-copy {
                background-color: #000;
                svg {
                    fill: #fff;
                }
            }
        }
        .btn-copy {
            position: absolute;
            right: 2px;
            top: 2px;
            bottom: 2px;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;

            background-color: #fff;

            &:hover {
                background-color: #f2f2f2;
            }
        }
    }
</style>
<style lang="scss">
    @import '../styles/scss/variables';
    .system-visuall {
        min-height:  445px;
    }
    .system-visuall {
        svg {
            max-width: 100%;
            height: auto;

            g {
                .g-track {
                    transition: 0.3s;
                    cursor: pointer;
                    &:hover {
                        fill: #000;
                    }
                    &.active {
                        fill: #000;
                    }
                }

                &.active .g-track {
                     fill: #000;
                }
                &.active .full,
                .g-track.full {
                    fill: $danger;
                }
            }

            circle {
                transition: all 0.4s;
                cursor: pointer;
            }
        }
    }

    @media print {
        html, body{
            height: 297mm;
            width: 210mm;
        }

        .noprint {
            display: none;
        }

        body {
            margin: 20mm 10mm 20mm 20mm;
        }

        .main-nav {
            opacity: 0;
        }

        .container {
            width: 100%;
            max-width: 100%;
        }

        .form-group__text--power {
            max-width: 165px;
        }

    }
</style>
