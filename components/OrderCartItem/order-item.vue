<template>
    <tr
        class="cart-order__item subproduct-item"
        :data-item-id="item.id">
        <td class="cart-order__img">
            <img
                class="img-responsive"
                style="max-width: 100px;width: 100px; vertical-align: middle;"
                v-if="item.image"
                :src="get_image(item.image)">
        </td>
        <td class="cart-order__desc">
            <span class="cart-order__title">{{ item.name }}</span><br>
            <span
                class="cart-order__attributes"
                v-for="attr in item.attributes"
                :key="attr.name"
                v-html="attr.value" />
        </td>
        <td class="cart-order__count noselect">
            <strong>
                <span class="amount">{{ item.quantity }} шт.</span>
            </strong>
        </td>
        <td class="cart-order__amount">
            <span>{{ pretyPrice(item.price_rub*item.quantity) }} ₽</span>
        </td>
    </tr>
</template>

<script>
import intcomma from '../../utils/helpers';

export default {

    props: {
        item: {
            type: Object,
            requared: true,
            default: () => {},
        },
    },

    data() {
        return {};
    },

    computed: {
        currency() {
            return 'RUB';
        },
    },

    methods: {
        get_image(image) {
            if (image.toLowerCase().endsWith('.svg')) return `/media/${image}`;
            return `https://st.centrsvet.ru/media/350x350_crop_80/${image}`;
        },
        pretyPrice(str) {
            return intcomma(str);
        },
    },
};

</script>

<style lang="scss" scoped>
    .purchase__currency {
        display: flex;
        justify-content: flex-end;
    }

    .purchase__currency .purchase__number {
        padding-right: 10px;
        margin-right: 10px;

        border-right: 1px solid #E0E0E0;
    }

    .purchase__currency .purchase__number:last-child {
        padding-right: 0;
        margin-right: 0;

        border: none;
    }

    .subproduct-down img {
        position: unset;
    }

    .totals {
        margin-top: 3em;
    }

</style>
<style lang="scss">
    .cart-order__attributes span {
        padding-right: 5px;
        color: #444;
    }
</style>
