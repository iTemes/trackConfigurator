<template>
    <section class="configurator-step">
        <h2 class="visually-hidden">
            Оформление заказа
        </h2>

        <div
            v-if="cartproject.total_quantity"
            class="container container--main container--final">
            <div class="cart-order">
                <h2 class="mb-3">
                    Сводная таблица
                </h2>
                <div class="table-responsive">
                    <table
                        class="table table-hover">
                        <thead class="hidden-xs table-light">
                            <th scope="col">
                                Продукт
                            </th>
                            <th scope="col">
                                Описание
                            </th>
                            <th scope="col">
                                Количество
                            </th>
                            <th
                                style="text-align: right;"
                                scope="col">
                                Сумма
                            </th>
                        </thead>

                        <OrderItem
                            v-for="item in cartproject.contents"
                            :item="item"
                            :key="item.id" />
                        <tr>
                            <td colspan="3" />
                            <td class="cart-order__total">
                                <span> Итог: {{ pretyPrice(cartproject.total_price_rub) }} ₽</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="checkout">
                <form
                    action="/checkout/order_save/"
                    method="post"
                    enctype="multipart/form-data"
                    id="checkout_form">
                    <h2>Оформление заказа</h2>
                    <input
                        type="hidden"
                        name="unique_id"
                        :value="cartId">
                    <fieldset class="form-group mb-5 mt-3">
                        <legend class="form-head">
                            Контакты
                        </legend>
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="form-floating mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="contact_surname"
                                        name="contact_surname"
                                        required
                                        placeholder="Фамилия">
                                    <label for="contact_surname">Фамилия:</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-floating mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="contact_name"
                                        name="contact_name"
                                        required
                                        placeholder="Фамилия">
                                    <label for="contact_name">Имя:</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-floating">
                                    <!-- <input
                                        type="tel"
                                        class="form-control"
                                        id="contact_tel"
                                        required
                                        placeholder="Фамилия"> -->
                                    <phone-mask-input
                                        placeholder="Телефон"
                                        v-model="phone"
                                        auto-detect-country
                                        show-flag
                                        wrapper-class="wrraper-tel"
                                        input-class="form-control form-control--tel"
                                        flag-class="form-control-flag" />
                                    <!-- <label for="contact_tel">Телефон:</label> -->
                                    <input
                                        type="hidden"
                                        name="phone_num"
                                        :value="phone">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-floating mb-3">
                                    <input
                                        type="mail"
                                        class="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Фамилия">
                                    <label for="email">Почта:</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="form-group mb-5 mt-3">
                        <legend class="form-head">
                            Комментарий к конфигурации
                        </legend>
                        <textarea
                            class="form-control"
                            id="commentConfiguration"
                            rows="3" />
                    </fieldset>
                    <fieldset class="mb-3">
                        <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="switchPresonal"
                                v-model="agreement"
                                required>
                            <label
                                class="form-check-label"
                                for="switchPresonal">Согласен на обработку персональных данных</label>
                        </div>
                        <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="switchSubscribe">
                            <label
                                class="form-check-label"
                                for="switchSubscribe">Подписаться на рассылку</label>
                        </div>
                    </fieldset>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                            type="submit"
                            class="btn btn-dark btn-lg">
                            Оформить
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div
            v-else
            class="container container--main">
            <p>
                Конфигурация больше недоступна!
                <router-link
                    to="/"
                    exact-path>
                    Вернуться к первому шагу
                </router-link>
            </p>
        </div>
    </section>
</template>

<script>
import PhoneMaskInput from 'vue-phone-mask-input';
import OrderItem from '../components/OrderCartItem/order-item.vue';
import intcomma from '../utils/helpers';

export default {
    components: { OrderItem, PhoneMaskInput },
    data() {
        return {
            api_url: '/cartproject/api/project',
            curs: 1,
            agreement: false,
            cartproject: {},
            phone: '',
        };
    },
    computed: {
        cartId() {
            return this.$store.getters.cart_id;
        },
    },
    methods: {
        pretyPrice(str) {
            return intcomma(str);
        },
        get_cartproject() {
            /* получение проекта заказа */
            const apiUrl = `${this.api_url}?unique_id=${this.cartId}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(response => {
                    this.cartproject = response.cart;

                    const itemIdList = response.cart.contents.reduce((accum, item) => {
                        accum.push(item.product_id);
                        return accum;
                    }, []);
                    if (window.gtag) {
                        window.gtag('event', 'page_view', {
                            send_to: 'AW-472178706',
                            ecomm_pagetype: 'cart',
                            ecomm_prodid: itemIdList,
                        });
                    }
                })
                .catch(error => {
                    throw new Error(error);
                });
        },
    },
    created() {
        if (!this.cartId) {
            const cartIdFromSesson = sessionStorage.getItem('cart_id');
            this.$store.commit('updateCartId', cartIdFromSesson);
        }
    },
    mounted() {
        this.get_cartproject();
    },
};
</script>

<style lang="scss" scoped>
    .form-head {
        font-size: 1rem;
        font-weight: 400;
    }
    .container--final {
        display: flex;
        justify-content: space-between;
    }
</style>
<style>
    .form-control-flag {
        position: absolute;
        right: 20px;
        top: 0.8rem;
    }

    .form-control.form-control--tel {
        padding: 1rem;
    }
</style>
