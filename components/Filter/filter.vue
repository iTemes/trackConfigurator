<template>
    <section
        class="products-filter container"
        id="product-list-items"
        :class="{ load: load }"
        @keyup.esc="closePopupWindow"
        tabindex="0"
        ref="modalFilter">
        <button
            class="filters-close"
            @click="closePopupWindow">
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
        <div
            class="filters"
            :class="{ open: filters_visible }"
            ref="filtersGroup">
            <div class="filters__header">
                <button
                    class="filteres-reset filteres-reset--mobile"
                    @click="reset_tags()">
                    Сброс
                </button>
                <h4>Фильтры</h4>
                <button @click="close_filters()">
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

            <div
                :key="groupList.parent_order"
                class="filter-bar"
                v-for="groupList in tag_groupList">
                <button
                    type="button"
                    class="filter-bar__btn dropdown-toggle"
                    :class="{ hasActive: hasActiveChildrens(groupList.children) }"
                    @click="toogleFilter($event)"
                    @blur="closeFilter($event)">
                    {{ groupList.name }}
                    <span
                        v-if="groupList.children.length > 1"
                        class="filter-bar__count">({{ groupList.children.length }})</span>
                    <span class="arrow" />
                </button>

                <div
                    class="dropdown-menu"
                    role="menu">
                    <vue-custom-scrollbar
                        class="filter-scroll-area"
                        wheel-speed="5">
                        <ul class="filter-bar__list">
                            <li
                                :key="group.id"
                                v-for="group in groupList.children">
                                <div
                                    class="filter-bar__field"
                                    :class="{ active: selectTags[group.id] }"
                                    @click="select_tag(group)">
                                    <label>
                                        <span class="filter-bar__text">
                                            {{ group.name }}
                                        </span>
                                    </label>
                                    <span class="filter-bar__cross">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="#fff">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M4.5 3.44l5.5 5.5 4.97-4.97a.75.75 0 1 1 1.06 1.06L11.06 10l4.97 4.97a.75.75 0 1 1-1.06 1.06L10 11.06l-5.5 5.5-1.06-1.06 5.5-5.5-5.5-5.5L4.5 3.44z" />
                                        </svg>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </vue-custom-scrollbar>
                </div>
            </div>
        </div>

        <div
            v-if="filters_visible && Object.keys(selectTags).length > 1"
            class="filters__footer">
            <button @click="close_filters()">
                <span v-if="!load">Показать {{ total_count }}</span>
                <span v-else>Загрузка...</span>
            </button>
        </div>

        <section
            class="product-finder"
            :class="{ loading: load, list: listView }"
            ref="productFinder">
            <div class="filtered-result">
                <div
                    v-if="Object.keys(selectTags).length"
                    class="quick-filteres-list">
                    <span
                        @click="quick_filter(id)"
                        :data-key="id"
                        :key="id"
                        v-for="(tag, id) in selectTags"
                        class="quick-filter">
                        <span class="quick-filter__title">{{ tag.name }}</span>
                        <span
                            class="quick-filter__close"
                            aria-label="remove" />
                    </span>
                    <button
                        v-if="Object.keys(selectTags).length > 1 && !this.load"
                        class="filteres-reset"
                        @click="reset_tags()">
                        Сбросить фильтры
                    </button>
                </div>

                <div class="filter-manual">
                    <button @click="open_filters()">
                        <svg
                            style="margin-right: 5px;"
                            data-v-f723ebce=""
                            height="20"
                            width="20"
                            viewBox="0 0 512 512">
                            <g data-v-f723ebce="">
                                <path
                                    data-v-f723ebce=""
                                    d="m420.041 0h-328.082c-50.708 0-91.959 41.251-91.959 91.959v328.081c0 50.709 41.251 91.96 91.959 91.96h328.082c50.708 0 91.959-41.251 91.959-91.959v-328.082c0-50.708-41.251-91.959-91.959-91.959zm12.649 399.561h-164.091c-14.422 42.69-75.006 42.755-89.449 0h-99.84c-19.922 0-19.927-30.118 0-30.118h99.84c14.421-42.69 75.006-42.755 89.449 0h164.091c19.922 0 19.928 30.118 0 30.118zm0-128.502h-35.589c-14.422 42.69-75.006 42.755-89.45 0h-228.341c-19.922 0-19.927-30.118 0-30.118h228.342c14.421-42.69 75.006-42.755 89.45 0h35.589c19.921 0 19.927 30.118-.001 30.118zm0-128.502h-228.342c-14.422 42.69-75.006 42.755-89.449 0h-35.589c-19.922 0-19.927-30.118 0-30.118h35.589c14.421-42.69 75.006-42.755 89.449 0h228.342c19.922 0 19.928 30.118 0 30.118z" />
                                <path
                                    data-v-f723ebce=""
                                    d="m223.875 367.435c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z" />
                                <path
                                    data-v-f723ebce=""
                                    d="m159.624 110.431c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z" />
                                <path
                                    data-v-f723ebce=""
                                    d="m352.376 238.933c-22.581 0-22.569 34.133 0 34.133 22.581.001 22.569-34.133 0-34.133z" />
                            </g>
                        </svg>
                        Фильтры
                    </button>
                </div>

                <div class="filtered-options">
                    <p class="filtered-result-count">
                        Найдено: <strong>{{ total_count }}</strong>
                    </p>
                    <div class="list-toggler">
                        <button
                            :class="{ active: !listView }"
                            data-view="square"
                            @click="toggleView($event)">
                            <svg
                                fill="#7b7b7b"
                                width="20"
                                height="20"
                                x="0px"
                                y="0px"
                                viewBox="0 0 50 50"
                                style="enable-background:new 0 0 50 50;"
                                xml:space="preserve">
                                <g>
                                    <g>
                                        <rect
                                            x="7.04"
                                            y="6.67"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="20.42"
                                            y="6.67"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="33.8"
                                            y="6.67"
                                            width="9.16"
                                            height="9.16" />
                                    </g>
                                    <g>
                                        <rect
                                            x="7.04"
                                            y="20.42"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="20.42"
                                            y="20.42"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="33.8"
                                            y="20.42"
                                            width="9.16"
                                            height="9.16" />
                                    </g>
                                    <g>
                                        <rect
                                            x="7.04"
                                            y="34.16"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="20.42"
                                            y="34.16"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="33.8"
                                            y="34.16"
                                            width="9.16"
                                            height="9.16" />
                                    </g>
                                </g>
                            </svg>
                            SquaredView
                        </button>
                        <button
                            :class="{ active: listView }"
                            data-view="list"
                            @click="toggleView($event)">
                            <svg
                                fill="#7b7b7b"
                                width="20"
                                height="20"
                                x="0px"
                                y="0px"
                                viewBox="0 0 50 50"
                                style="enable-background:new 0 0 50 50;"
                                xml:space="preserve">
                                <g>
                                    <g>
                                        <rect
                                            x="7.04"
                                            y="7.19"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="20.42"
                                            y="10.95"
                                            width="22.54"
                                            height="1.66" />
                                    </g>
                                    <g>
                                        <rect
                                            x="7.04"
                                            y="20.42"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="20.42"
                                            y="24.17"
                                            width="22.54"
                                            height="1.66" />
                                    </g>
                                    <g>
                                        <rect
                                            x="7.04"
                                            y="33.64"
                                            width="9.16"
                                            height="9.16" />
                                        <rect
                                            x="20.42"
                                            y="37.39"
                                            width="22.54"
                                            height="1.66" />
                                    </g>
                                </g>
                            </svg>
                            ListView
                        </button>
                    </div>
                </div>
            </div>

            <div
                v-if="load"
                class="content__progress_bar" />
            <div class="content__group d-flex flex-wrap">
                <template v-for="subproduct in subproductList">
                    <article
                        :key="subproduct.id"
                        class="content__item">
                        <figure class="content__item-box">
                            <a
                                class="content__item__link"
                                :href="subproduct.absolute_url"
                                target="_blank"
                                @click="addLight(subproduct, $event)">
                                <img
                                    :src="subproduct.icon_image1"
                                    loading="lazy"
                                    class="img-responsive"
                                    width="400"
                                    height="400"
                                    alt="">
                                <!-- eslint-disable -->
                                <svg
                                    class="content__item__add"
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
                            </a>
                            <transition name="slide-fade">
                                <div
                                    v-if="listView"
                                    class="content-item__scheme">
                                    <a
                                        :href="subproduct.absolute_url"
                                        target="_blank">
                                        <img
                                            :src="subproduct.install_image"
                                            loading="lazy"
                                            class="img-responsive"
                                            width="400"
                                            height="400"
                                            alt="">
                                    </a>
                                </div>
                            </transition>

                            <transition name="slide-fade">
                                <figcaption
                                    v-if="!listView"
                                    :key="subproduct.name + 'name'"
                                    class="content__name content__name-card">
                                    <a
                                        class="content__name-card-link"
                                        :href="subproduct.absolute_url"
                                        target="_blank">
                                        <h4 class="content__title content__title--main">{{ subproduct.name }}</h4>
                                    </a>

                                    <a
                                        class="visually-hidden"
                                        v-html="subproduct.title"
                                        :href="subproduct.absolute_url" />
                                </figcaption>

                                <figcaption
                                    v-else
                                    :key="subproduct.name + 'desc'"
                                    class="content__name">
                                    <a
                                        :href="subproduct.absolute_url"
                                        target="_blank">
                                        <h4 class="content__title">{{ subproduct.name }}</h4>
                                    </a>
                                    <div class="content__attributes">
                                        <div
                                            class="content__attribute"
                                            v-if="subproduct.attributes.color">
                                            <span class="content__attribute-title">Цвет: </span>
                                            <span
                                                class="color-tip"
                                                :class="subproduct.attributes.color" />
                                            <span class="content__attribute-text">
                                                {{ subproduct.attributes['цвет'] }}
                                            </span>
                                        </div>
                                        <div
                                            v-if="subproduct.attributes.angle_name"
                                            class="content__attribute">
                                            <div class="subproduct__angle">
                                                <span class="content__attribute-title">Угол света: </span>
                                                <iconBase
                                                    v-if="subproduct.attributes.angle_name === 'Spot'"
                                                    icon-name="spot">
                                                    <iconSpot />
                                                </iconBase>
                                                <iconBase
                                                    v-else
                                                    icon-name="flood">
                                                    <iconFlood />
                                                </iconBase>
                                                <span class="content__attribute-text">
                                                    {{ subproduct.attributes.angle_name }}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            class="content__attribute"
                                            v-if="subproduct.ostatok">
                                            <span
                                                class="content__attribute-title"
                                                v-if="subproduct.ostatok">В наличии:
                                            </span>
                                            <span class="content__attribute-text content__attribute-text--amount">
                                                {{ subproduct.ostatok }}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        @click="addLight(subproduct, $event)"
                                        v-if="subproduct.price && subproduct.ostatok"
                                        class="btn btn-default btn-outline-secondary btn-project">
                                        <span class="btn-project-text">Добавить в проект</span>
                                        <a
                                            href="/cartproject/show_project/"
                                            target="_blank"
                                            class="btn-project-text-active">В проекте</a>
                                    </button>
                                </figcaption>
                            </transition>
                        </figure>
                    </article>
                </template>
            </div>
        </section>

        <div
            v-if="!load && total_count > 30"
            class="finder-pagination">
            <button
                class="btn btn-default"
                :disabled="!previous"
                @click="get_items(previous)">
                Назад
            </button>
            <button
                class="btn btn-default"
                :disabled="!next"
                @click="get_items(next)">
                Далее
            </button>
        </div>
    </section>
</template>

<script>
import Axios from 'axios';

import Cookies from 'js-cookie';
import vueCustomScrollbar from 'vue-custom-scrollbar';
import 'vue-custom-scrollbar/dist/vueScrollbar.css';
import smoothscroll from 'smoothscroll-polyfill';
import iconBase from './icons/base.vue';
import iconFlood from './icons/wide.vue';
import iconSpot from './icons/spot.vue';

export default {
    components: {
        vueCustomScrollbar,
        iconBase,
        iconFlood,
        iconSpot,
    },

    data() {
        return {
            load: false,
            selectTags: {
                2023: { name: 'Светильник', parent: 237 },
                3016: { name: 'В трек', parent: 2965 },
                2909: { name: 'INFINITY', parent: 251 },
                1283: { name: 'Интерьер', parent: 245 },
                3008: { name: 'Трековый', parent: 2966 },
                2197: { name: 'IP40', parent: 243 },
            },
            defaultTags: [2023, 3016, 2909, 1283, 3008, 2197],
            results: [],
            sorting: 'name',
            sorting_list: {
                Название: 'name',
                'Цена+': 'price',
                'Цена-': '-price',
            },
            subproductList: [], // список субпродуктов
            tag_groupList: [], // доступный список групп характеристик
            total_count: 0,
            available_tag: [],
            template_name: null,
            limit: 30,
            next: null,
            previous: null,
            listView: false,
            first_load: true,
            filters_visible: false,
        };
    },

    computed: {
        get_apiUrl() {
            const query = Object.entries(this.selectTags)
                .map(k => `${k[1].parent}-${k[0]}`)
                .join('/');
            return `/catalog/api/subproduct-tag/${query}?limit=${this.limit}&sort=${this.sorting}`;
        },
        filters_count() {
            return this.selectTags;
        },
    },

    methods: {
        closePopupWindow() {
            this.$emit('close_filters');
        },
        addLight(subproduct, evt) {
            evt.preventDefault();
            this.$emit('add_light', subproduct);
        },
        open_filters() {
            this.filters_visible = true;
            document.documentElement.classList.add('modal-open');
        },
        close_filters() {
            this.filters_visible = false;
            document.documentElement.classList.remove('modal-open');
        },
        toggleView(evt) {
            const viewTarget = evt.currentTarget.dataset.view;

            if (viewTarget === 'list') {
                this.$refs.productFinder.classList.add('list');
                setTimeout(() => {
                    this.listView = true;
                }, 450);
            } else {
                this.$refs.productFinder.classList.remove('list');
                this.listView = false;
            }
        },
        set_sorted(field) {
            this.sorting = field;
            this.get_items(this.get_apiUrl);
        },
        quick_filter(id) {
            delete this.selectTags[id];
            this.selectTags = { ...this.selectTags };
            this.get_items(this.get_apiUrl);
        },
        closeAllFilters() {
            const filters = document.querySelectorAll('.filter-bar.open');
            filters.forEach(item => {
                item.classList.remove('open');
            });
        },
        toogleFilter(evt) {
            const element = evt.currentTarget;
            const parentElement = element.closest('.filter-bar');
            const mobileWidth = window.innerWidth;

            evt.preventDefault();
            if (!parentElement.classList.contains('open') && mobileWidth > 1024) {
                this.closeAllFilters();
            }
            element.classList.toggle('active');
            parentElement.classList.toggle('open');
        },
        closeFilter(evt) {
            evt.preventDefault();
            evt.currentTarget.classList.remove('active');
            evt.currentTarget.closest('.filter-bar').classList.remove('open');
        },
        select_tag(group) {
            /* выбор тега, добавить или удалить из списка тегов, переписать url */
            if (this.selectTags[group.id]) {
                delete this.selectTags[group.id];
                this.selectTags = { ...this.selectTags };
            } else {
                this.selectTags = {
                    ...this.selectTags,
                    [group.id]: { name: group.name, parent: group.parent },
                };
            }
            this.closeAllFilters();
            this.get_items(this.get_apiUrl);
        },

        make_desc(item) {
            /* формирование описания продукта из групп продукта */
            const tagls = item.groups_list
                .map(tag => this.available_tag.filter(x => x.tag_id === tag.tag_id))
                .filter(x => x.length);

            return tagls.map(z => z.map(x => `${x.tag__parent__name} / ${x.tag__name}`));
            // ~ return tagls.map(z=>{return z.map(x=>{return `${x.tag__name}`}) } );
        },

        get_items(apiUrl) {
            this.load = true;
            Axios.get(apiUrl)
                .then(response => {
                    this.load = false;
                    this.results = response.data.results;
                    this.subproductList = response.data.results;
                    this.total_count = response.data.count;
                    this.next = response.data.next;
                    this.previous = response.data.previous;
                    this.available_tag = response.data.available_tag;

                    this.tag_groupList = response.data.available_tag.reduce((result, tag) => {
                        if (this.defaultTags.indexOf(tag.tag_id) > 0) {
                            return result;
                        }

                        result[tag.tag__parent__name] = [
                            {
                                id: tag.tag_id,
                                name: tag.tag__name,
                                order: tag.tag__order_num,
                                parent_order: tag.tag__parent__order_num,
                                parent: tag.tag__parent_id,
                            },
                            ...(result[tag.tag__parent__name] || []),
                        ];
                        // eslint-disable-next-line no-nested-ternary
                        result[tag.tag__parent__name].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()
                            ? 1
                            : a.name.toLowerCase() < b.name.toLowerCase()
                                ? -1
                                : 0));
                        return result;
                    }, {});

                    this.tag_groupList = Object.entries(this.tag_groupList)
                        .map(x => ({
                            name: x[0],
                            parent_order: x[1][0].parent_order,
                            order: x[1][0].order,
                            children: x[1].sort((a, b) => a.order - b.order),
                        }))
                        .sort((a, b) => a.parent_order - b.parent_order);

                    if (this.first_load) return;

                    setTimeout(() => {
                        const offsetTop = this.$refs.productFinder.offsetTop - 270;

                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth',
                        });
                    }, 400);
                })
                .catch(error => {
                    this.errored = true;
                    throw new Error(error);
                })
                .finally(() => {
                    this.first_load = false;
                });
        },

        reset_tags() {
            this.selectTags = {
                2023: { name: 'Светильник', parent: 237 },
                3016: { name: 'В трек', parent: 2965 },
                2909: { name: 'INFINITY', parent: 251 },
                1283: { name: 'Интерьер', parent: 245 },
                3008: { name: 'Трековый', parent: 2966 },
                2197: { name: 'IP40', parent: 243 },
            };

            this.get_items(this.get_apiUrl);
        },
        hasActiveChildrens(childrens) {
            // eslint-disable-next-line no-restricted-syntax
            for (const child of childrens) {
                if (this.selectTags[child.id]) {
                    return true;
                }
            }
            return false;
        },
    },
    mounted() {
        this.$refs.modalFilter.focus();
    },
    created() {
        Axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

        this.get_items(this.get_apiUrl);
        smoothscroll.polyfill();
    },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: transform 0.3s ease 0.2s, opacity 0.3s ease 0.2s;
}
.slide-fade-leave-active {
    transition: all 0.2s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(-50px);
    opacity: 0;
}

.products-filter {
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: 80vh;

    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,.16);
    border-radius: 0.6rem;
}

.filters {
    /* position: sticky; */
    /* top: 115px; */

    display: flex;
    flex-wrap: wrap;
    width: 100%;

    padding-bottom: 30px;
    padding-top: 16px;
    background-color: #fff;
    border-bottom: 1px solid #606060;
    z-index: 8;

    &__header {
        display: none;
    }

    &-close {
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
}

.filter-bar {
    position: relative;
    padding-right: 0.75rem;
    max-width: 400px;

    &:hover .arrow::before,
    &:hover .arrow::after {
        background-color: #000;
    }

    &.open {
        .filter-bar__btn {
            z-index: 9;

            background-color: rgba(0, 0, 0, 0.95);
            color: #fff;
        }

        .dropdown-menu {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .filter-scroll-area {
            max-height: 25rem;
        }

        .arrow:before {
            transform: rotate(-45deg);
        }

        .arrow:after {
            transform: rotate(45deg);
        }
    }

    &__btn {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 400;

        width: 100%;
        padding: 20px 0px;

        text-align: left;
        position: relative;
        z-index: 6;

        color: #0c0c0c;

        /* fix */
        font-size: 0.9375rem;
        line-height: 1.46667;
        background-color: #fff;
        border: 1px solid #e6e6e6;
        color: #000;
        font-weight: normal;
        padding: 1rem;

        transition: color 0.2s, background-color 0.2s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.75);
            color: #fff;
        }

        &.hasActive {
            background-color: rgba(0, 0, 0, 0.95);
            color: #fff;
        }
    }

    &__list {
        width: 100%;
        padding-left: 0;
        margin-bottom: 0;

        list-style: none;
    }

    &__field {
        position: relative;

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.66667rem 0.66667rem;

        border-top: 1px solid #e6e6e6;
        background: #f0f0f0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        transition: 0.3s 0.15s ease-out;

        &:hover {
            border-color: #000;

            .filter-bar__text {
                color: #000;
            }
        }

        &.active {
            background-color: #000;
            color: #fff;

            .filter-bar__cross {
                display: flex;
            }

            .filter-bar__text {
                color: #fff;
            }
        }
        > label {
            cursor: pointer;
            margin: 0;
        }
    }

    &__text {
        font-weight: 400;
        line-height: 1.5;
        font-size: 0.935rem;
        text-transform: capitalize;

        color: #222;
    }

    &__count {
        margin-left: 5px;
        font-size: 12px;
        color: #777;

        display: none;
    }

    &__cross {
        display: none;
    }

    .dropdown-toggle::after {
        display: none;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0px;
        z-index: 1000;

        display: block;
        width: 100%;
        min-width: 280px;
        padding: 0;
        margin: 0;

        border: none;
        box-shadow: none;
        list-style: none;
        font-size: 16px;
        text-align: left;
        background-color: #fff;
    }

}

.filter-manual {
    display: none;
}

.product-finder {
    width: 100%;
    flex-grow: 1;

    &.loading {
        opacity: 0.4;
        pointer-events: none;
    }
}

.finder-pagination {
    display: flex;
    margin-left: auto;

    .btn {
        margin-right: 20px;
    }
}

.btn-default[disabled] {
    background-color: #fff;
    opacity: 0.3;
}

.filtered-options {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.list-toggler {
    display: flex;
    margin-top: 1rem;
    border: 1px solid #d6d6d6;

    button {
        width: 40px;
        height: 40px;

        background: #fff;
        font-size: 0;
        box-shadow: none;
        border: none;

        &:hover {
            background: #222;
            svg {
                fill: #fff;
            }
        }
        &.active {
            background: #222;
        }
        &.active svg {
            fill: #fff;
        }
    }
}

.content__group {
    padding-top: 50px;
    margin: 0 -12px 50px;
}

.content__progress_bar {
    position: absolute;
    top: 10px;

    width: 100%;
    height: 4px;
    overflow: hidden;
}

.content__progress_bar:before {
    content: '';
    position: absolute;
    left: 0;

    height: 4px;
    width: 100%;

    transform: translateX(-95%);
    background-color: #000;

    animation: progress 5s ease-in-out 0.1s forwards;
}

.filter-scroll-area {
    max-height: 0;
    overflow: hidden;
    overflow-y: auto;

    transition: 0.4s ease-in-out;
}

.arrow {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: auto;

    border: 2px solid transparent;
    border-radius: 50%;

    display: none;
    &::before,
    &::after {
        content: '';
        top: 9px;
        position: absolute;
        width: 12px;
        height: 2px;
        background-color: #000;
        display: inline-block;
        transition: all 0.2s ease;
    }

    &::before {
        left: 4px;
        transform: rotate(0deg);
    }

    &::after {
        left: 4px;
        transform: rotate(90deg);
    }
}

.quick-filteres-list {
    display: flex;
    align-items: center;
}

.quick-filter {
    display: flex;
    align-items: center;
    border: 1px solid #000;
    transition: all 0.3s ease;
    margin-top: 1rem;
    margin-right: 1rem;
    padding: 0.5rem 0.7rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    text-transform: capitalize;
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background-color: #000;
        color: #fff;

        .quick-filter__close:before,
        .quick-filter__close:after {
             background-color: #fff;
        }
    }

    &__close {
        position: relative;
        width: 21px;
        height: 22px;
        margin-left: 5px;
        opacity: 1;

        &::before,
        &::after {
            position: absolute;
            left: 10px;
            top: 7px;
            content: ' ';
            height: 10px;
            width: 2px;
            background-color: #000;
        }
        &::before {
            transform: rotate(45deg);
        }
        &::after {
            transform: rotate(-45deg);
        }
    }

    &__title {
        font: inherit;
    }
}
/* Скрытие текущего фильтра, пока для Светильников хардкод */
.quick-filter[data-key='2023'],
.quick-filter[data-key='1283'],
.quick-filter[data-key='2909'],
.quick-filter[data-key='3016'],
.quick-filter[data-key='3008'],
.quick-filter[data-key='2197'] {
    display: none;
}

.filtered-result {
    display: flex;
    align-items: center;
}

.filtered-result-count {
    margin-top: 2rem;
    padding-bottom: 0;
    margin-right: 1rem;
    margin-left: auto;

    font-size: 32px;
    line-height: 36px;
}

.filteres-reset {
    margin-top: 1rem;
    padding: 0.625rem 0.9375rem;
    padding-left: 0;
    max-width: 400px;

    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;

    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: right;
    border-radius: 0;
}
.content__item {
    margin-bottom: 24px;
    transform: translate3d(0, 0, 0);
    transition: width 0.45s, transform 0.35s;

    &:hover {
        .content__item-box {
            box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 10px -1px, rgba(0, 0, 0, 0.01) 0px 10px 10px -3px;
        }
    }
    .content__item-box {
        display: flex;
        flex-direction: column;
        height: 100%;

        overflow: hidden;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        transition: all 0.3s;
    }
    &__link {
        position: relative;

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

        img {
            cursor: pointer;
        }
        &:hover {
            &::after {
                background-color: rgba(0,0,0,.56);
            }
            .content__item__add  {
                display: block;
            }
        }
    }
    &__add {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        z-index: 2;
        display: none;
    }
    img {
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        cursor: default;
    }
    a,
    & a img {
        cursor: pointer;
        width: 100%;
    }
}

.product-finder:not(.list) .content__item:hover {
    transform: translate3d(0, -5px, 0);
}

.content__name {
    padding: 1rem;

    padding-top: 30px;
    margin-top: 0;
}

.content__name.content__name-card {
    padding: 0;
    margin: 0;
    flex-grow: 1;
}

.content__name-card-link {
    display: block;
    padding: 1rem;
    padding-top: 30px;
    margin-top: 0;

    text-decoration: none;
    color: inherit;
    font-weight: 400;
}

.product-finder:not(.list) .content__name:hover {
    background-color: #222;
    color: #fff;
}

.content__title {
    font-weight: 500;
    margin: 0;
    padding-right: 0;
    line-height: 18px;
    font-size: 12px;
}

.content__attribute {
    display: flex;
    align-items: center;

    padding: 0;
    margin-bottom: 8px;
}

.content__attribute-text {
    text-transform: capitalize;
    font-size: 14px;
}

.content__attribute-title {
    min-width: 75px;
    font-size: 14px;
}

.btn-project {
    max-width: 180px;
    padding: 10px;
    font-size: 12px;

    &.active {
        background: #000 !important;
        color: #fff !important;
    }
}

.btn-project-text,
.btn-project-text-active {
    font: inherit;
    text-decoration: none;
}

.btn-project .btn-project-text-active {
    display: none;
}

.btn-project.active .btn-project-text {
    display: none;
}

.btn-project.active .btn-project-text-active {
    color: #fff;
    display: block;
}

.quick-order {
    position: absolute;
    top: 0;
    right: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;

    box-shadow: none;
    border: none;
    border-radius: 0 4px 0 0;
    outline: none;
    background-color: #f4f4f4;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &.active {
        background-color: #000;
        opacity: 1;

        svg {
            fill: #fff;
        }
    }
    &:hover {
        background-color: #000;

        svg {
            fill: #fff;
        }
    }
}

@media (min-width: 768px) {
    .content__item:hover .quick-order {
        opacity: 1;
        pointer-events: all;
    }
}
@media (min-width: 1440px) {
    .products-filter {
        min-height: unset;
        height: 80vh;
        overflow: hidden;
        overflow-y: auto;
    }
}
@media (min-width: 1920px) {
    .product-finder .content__item {
        width: 14.25%;
    }

    .product-finder.list .content__item {
        width: 50%;
    }

    .product-finder.list .content__item-box {
        flex-direction: row;
        justify-content: space-between;
    }

    .product-finder.list .content-item__scheme {
        width: 33%;
    }

    .product-finder.list .content__item__link {
        width: 33%;
    }

    .product-finder.list .content__name {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 33%;
        padding-left: 40px;
    }

    .product-finder.list .content__title--main {
        display: none;
    }

    .content__item img {
        max-width: 300px;
    }

    .product-finder.list .content__item img {
        border-color: transparent;
    }

    .content__item {
        padding-right: 12px;
        padding-left: 12px;
    }

    .content__item img {
        padding-top: 2rem;
        padding-bottom: 2rem;
        background-color: #fff;
    }
}

@media (max-width: 1919px) {
    .content__group {
        justify-content: space-between;
    }
    .content__item {
        width: 19%;

        .content__item-box {
            height: 100%;
        }
    }

    .content__attribute {
        flex-wrap: wrap;

        font-size: 12px;
    }

    .subproduct__angle {
        flex-wrap: wrap;
    }

    .quick-filteres-list {
        width: 50%;
        flex-wrap: wrap;
    }

    .btn-project {
        font-size: 10px;
    }

    .filtered-result-count {
        font-size: 14px;
        margin-right: 10px;
    }
}

@media (max-width: 1023px) {
    .content__item {
        width: 45%;

        .content__item-box {
            height: 100%;
        }
    }

    .content__name-card-link {
        padding: 0.5rem;
    }

    .content__title  {
        font-size: 0.75rem;
    }
    .filter-bar .dropdown-menu {
        position: static;
    }

    .filter-bar__field {
        padding-left: 20px;
        padding-right: 20px;
    }

    .products-filter {
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .filters {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        width: 100%;
        padding: 0px;
        padding-bottom: 60px;
        margin: 0;
        height: auto;
        overflow: hidden;
        overflow-y: auto;

        background-color: #fff;
        z-index: 1000;

        transform: translate3d(-110%, 0, 0);
        transition: transform 0.3s ease-in-out;
    }

    .filters.open {
        transform: translate3d(0, 0, 0);
    }

    .filters__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;

        background-color: #f5f5f6;
    }

    .filters__header h4 {
        margin: 0;
        flex-grow: 1;

        font-size: 14px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
    }

    .filters__header button {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: transparent;
        border: none;
        box-shadow: none;
    }

    .filtered-result {
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        padding-top: 25px;
    }

    .filters__footer {
        position: fixed;
        bottom: 50px;
        z-index: 1001;

        left: 20px;
        right: 20px;
    }

    .filters__footer button {
        padding: 15px 10px;
        width: 100%;

        background-color: #222;
        color: #fff;
        font-weight: 400;
        border: none;
        box-shadow: none;
        border-radius: 6px;
    }

    .filters__footer span {
        font: inherit;
    }

    .product-finder {
        width: 100%;
        padding-left: 0;
        padding-bottom: 60px;
    }

    .filter-bar {
        max-width: unset;
        padding-right: 0;
    }

    .filter-bar:last-of-type {
        padding-bottom: 100px;
    }

    .filter-bar__btn {
        padding-left: 20px;
        padding-right: 20px;

        font-size: 17px;
        line-height: 1.47059;

        border: none;
        border-top: solid 1px #e6e4e2;
    }

    .filter-bar__btn:hover {
        background-color: transparent;
        color: #000;
    }
    .filter-bar__btn.active {
        background-color: transparent;
        color: #000;
    }

    .filters__header + .filter-bar .filter-bar__btn {
        border-top: none;
    }

    .filter-bar.open .filter-bar__btn {
        background-color: transparent;
        color: #000;
    }

    .filter-bar__btn.hasActive {
        background-color: #000;
        color: #fff;
    }
    .filter-bar__btn.hasActive .arrow {
        border-color: #fff;
    }
    .filter-bar__btn.hasActive .arrow::after,
    .filter-bar__btn.hasActive .arrow::before {
        background-color: #fff;
    }

    .finder-pagination {
        width: 100%;
        margin-left: 0;
    }

    .finder-pagination .btn {
        padding: 10px;
        min-width: 140px;
    }

    .finder-pagination .btn:last-child {
        margin-right: 0;
    }

    .quick-filteres-list {
        order: 1;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .filter-manual {
        display: block;
    }

    .filter-manual button {
        display: flex;
        align-items: center;

        background-color: transparent;
        border: none;
        box-shadow: none;

        font-size: 18px;
        font-weight: 600;
    }

    .quick-filter {
        padding: 7px;
        font-size: 12px;
        line-height: 1;
        margin-right: 5px;
        margin-bottom: 5px;
        margin-top: 0;

        border: none;
        background-color: #000;
        color: #fff;
    }

    .arrow {
        display: flex;
        margin-right: 0;
        border-color: #000;
    }

    .filteres-reset {
        display: none;
    }

    .filteres-reset.filteres-reset--mobile {
        display: block;
        margin: 0;
        padding: 0;

        background-color: transparent;

        color: #f00;
    }

    .quick-filter__close {
        width: 15px;
        height: 15px;

        border: 1px solid #000;
        border-radius: 50%;
    }

    .quick-filter__close::before,
    .quick-filter__close::after {
        left: 6px;
        top: 3px;

        height: 7px;
        width: 1px;

        background-color: #fff;
    }

    .list-toggler {
        margin-top: 0;
    }

    .list-toggler button {
        width: 30px;
        height: 30px;
    }

    .list-toggler button svg {
        width: 16px;
        height: 16px;
    }

    .filtered-result-count {
        margin-top: 0;
        margin-bottom: 0;
    }
    .content__group {
        padding-top: 20px;
        margin-bottom: 10px;
        justify-content: space-between;
    }

    .filter-bar__cross svg {
        widows: 15px;
        height: 15px;
    }

    .filters-close {
        position: absolute;
        right: 5px;
        top: 30px;
    }
}

@media (max-width: 767px) {
    .content__item {
        width: 49%;
    }
    .products-filter {
        margin-top: 20px;
    }

    .quick-filter:last-child {
        margin-right: 0;
    }

    .content__name {
        flex-grow: 1;
    }

    .product-finder.list .content__item {
        width: 100%;
    }

    .btn-project {
        margin-top: 30px;
    }
}

@keyframes progress {
    from {
        transform: translateX(-95%);
    }

    to {
        transform: translateX(0);
    }
}
</style>
<style>
.color-tip {
    display: block;
    margin-left: 20px;
    margin-right: 5px;
    width: 25px;
    height: 25px;
    border: 1px solid #d6d6d6;
}

.color-tip.B,
.color-tip.BB,
.color-tip.BK,
.color-tip.BD,
.color-tip.BP {
    background-color: #000000;
}

.color-tip.BC {
    background: #3b3b3b;
}

.color-tip.GR {
    background: #3a3d42;
}

.color-tip.CB {
    background: linear-gradient(
        180deg,
        #6e6b66 0%,
        #6e6b66 17.71%,
        #000000 21.35%,
        #bbbab8 32.29%,
        #030303 64.06%,
        #393631 68.23%,
        #898582 91.15%,
        #383431 100%
    );
}

.color-tip.CH {
    background: linear-gradient(
        180deg,
        #b6b6b6 0%,
        #b5b5b5 17.71%,
        #000000 21.35%,
        #e3e3e3 32.29%,
        #313131 64.06%,
        #848484 68.23%,
        #cacaca 85.42%,
        #7d7d7d 100%
    );
}

.color-tip.MS,
.color-tip.SS,
.color-tip.AL,
.color-tip.WS {
    background: linear-gradient(180deg, #969696 0%, #bababa 33.85%, #bebebd 48.44%, #c1c1bf 61.98%, #939393 100%);
}

.color-tip.GG,
.color-tip.BR {
    background: linear-gradient(
        180deg,
        #d7b878 0%,
        #debf7e 17.19%,
        #5a3800 19.79%,
        #fbf4d6 23.96%,
        #ae8a4c 56.25%,
        #393631 63.02%,
        #bb9554 66.15%,
        #e6d2ad 83.33%,
        #b79452 100%
    );
}

.color-tip.GD {
    background: linear-gradient(180deg, #7a5c28 0%, #c2a468 34.9%, #c2a468 50%, #c2a468 65.1%, #79592b 100%);
}

.color-tip.BZ {
    background: linear-gradient(180deg, #3c2618 0%, #846046 34.9%, #846046 50%, #846046 65.1%, #41261b 100%);
}

.color-tip.CD,
.color-tip.CP {
    background: linear-gradient(180deg, #7d4525 0%, #c78b66 34.38%, #c78b66 48.96%, #c78c66 63.54%, #7f4426 100%);
}

.color-tip.CF {
    background: linear-gradient(180deg, #43362e 0%, #746352 26.56%, #927e6b 50.14%, #816e5c 71.88%, #67574a 100%);
}

.subproduct__angle {
    display: flex;
    align-items: center;
}

.subproduct__angle .subproduct-angle-icon {
    width: 25px;
    height: 25px;
    margin-left: 20px;
    margin-right: 5px;
}

.content__attribute-text--amount {
    margin-left: 20px;
    font-weight: 400;
}

@media (max-width: 1439px) {
    .content__attribute-text--amount {
        margin-left: 10px;
    }
}
</style>
