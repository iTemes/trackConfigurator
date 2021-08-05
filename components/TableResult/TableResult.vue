<template>
    <section
        v-if="show"
        class="form-group">
        <h3 class="form-head  mb-5">
            Результат
        </h3>
        <table class="table">
            <thead>
                <tr>
                    <th
                        class="table__title"
                        scope="col">
                        Наименование
                    </th>
                    <th
                        class="table__title"
                        scope="col">
                        Кол-во
                    </th>
                    <th
                        class="table__title"
                        scope="col">
                        Длинна
                    </th>
                    <th
                        class="table__title"
                        scope="col">
                        Длинна стороны
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="side in sides">
                    <tr
                        :key="side.name"
                        class="table__headline">
                        <th colspan="4">
                            {{ side.name }}
                        </th>
                    </tr>
                    <tr
                        v-show="side.tracks.length"
                        :key="side.name + 'tracks'">
                        <th scope="row">
                            Трек -  {{ $t(`message.${mountingFromStore}`) }}
                        </th>
                        <td>{{ calcTrackCountOnSide(side) }} шт.</td>
                        <td>2500 мм</td>
                        <td>{{ side.side_total_length }} мм</td>
                    </tr>
                </template>
                <template v-if="totalTracksCount">
                    <tr class="table__headline">
                        <th colspan="4">
                            Всего:
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Трек -  {{ $t(`message.${mountingFromStore}`) }}
                        </th>

                        <td>
                            {{ totalTracksCount }} шт.
                        </td>
                        <td colspan="2" />
                    </tr>
                </template>
                <tr class="table__headline">
                    <th colspan="4">
                        Аксессуары
                    </th>
                </tr>
                <tr v-if="totalContainerForTracks">
                    <td>Канал для треков: </td>
                    <td colspan="4">
                        {{ totalContainerForTracks }} шт.
                    </td>
                </tr>
                <tr v-if="totalSuspension">
                    <td>Подвесы для треков: </td>
                    <td colspan="4">
                        {{ totalSuspension }} шт.
                    </td>
                </tr>
                <tr v-if="totalSuspension">
                    <td>Подвесной элемент: </td>
                    <td colspan="4">
                        {{ totalSuspension }} шт.
                    </td>
                </tr>
                <tr v-if="corners">
                    <td>Угловые соединители: </td>
                    <td colspan="4">
                        {{ corners }} шт.
                    </td>
                </tr>
                <tr v-if="corners">
                    <td>Гибкий токопроводящий соединитель: </td>
                    <td colspan="4">
                        {{ corners }} шт.
                    </td>
                </tr>
                <tr v-if="totalConnectors">
                    <td>Токопроводящие соединители: </td>
                    <td colspan="4">
                        {{ totalConnectors }} шт.
                    </td>
                </tr>
                <tr v-if="totalMetalicConnectors">
                    <td>Металлические соединители: </td>
                    <td colspan="4">
                        {{ totalMetalicConnectors }} шт.
                    </td>
                </tr>
                <tr v-if="stubs">
                    <td>Комплект боковых заглушек: </td>
                    <td colspan="4">
                        {{ stubs }} шт.
                    </td>
                </tr>
                <tr>
                    <td>Блок питания</td>
                    <td colspan="4">
                        1 шт.
                    </td>
                </tr>
                <tr v-if="isSmartLight">
                    <td>Блок INF SMART LIGHT</td>
                    <td colspan="4">
                        1 шт.
                    </td>
                </tr>
                <tr v-if="isPowerAdaptor">
                    <td>Адаптер для внешнего блока питания</td>
                    <td colspan="4">
                        1 шт.
                    </td>
                </tr>
                <tr
                    class="table__headline"
                    v-if="subproducts">
                    <th colspan="4">
                        Светильники
                    </th>
                </tr>
                <tr
                    :key="subproduct.id"
                    v-for="subproduct in subproducts">
                    <td>{{ subproduct.name }}</td>
                    <td colspan="4">
                        {{ subproduct.count }} шт.
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        show: {
            type: [Boolean, String],
            default: false,
        },
        totalTracksCount: {
            type: Number,
            default: 0,
        },
        totalContainerForTracks: {
            type: Number,
            default: 0,
        },
        totalSuspension: {
            type: Number,
            default: 0,
        },
        corners: {
            type: Number,
            default: 0,
        },
        totalConnectors: {
            type: Number,
            default: 0,
        },
        totalMetalicConnectors: {
            type: Number,
            default: 0,
        },
        stubs: {
            type: Number,
            default: 0,
        },
        isSmartLight: {
            type: [Boolean, Number],
            default: false,
        },
        isPowerAdaptor: {
            type: [Boolean, Number],
            default: false,
        },
        subproducts: {
            type: Array,
            default: null,
        },
    },
    computed: {
        ...mapState({
            sidesFromStore: 'sides',
            mountingFromStore: 'system_mounting',
            typeFromStore: 'control_type',
            placeFromStore: 'control_place',
            totalLengthFromStore: 'total_length',
        }),
        sides: {
            get() {
                return this.sidesFromStore;
            },
            set(newValue) {
                this.updateSides(newValue);
            },
        },
    },
    methods: {
        calcTrackCountOnSide(side) {
            const sideTrackCount = +(side.side_total_length / 2500).toFixed(1);
            return sideTrackCount;
        },
    },
};
</script>
