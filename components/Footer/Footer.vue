<template>
    <footer class="page-footer noprint">
        <div class="container d-flex justify-content-xl-between flex-wrap align-items-xl-center">
            <div class="wysiwyg">
                <div>
                    <b>Ваша конфигурация:</b>
                    <p
                        class="wysiwyg__text"
                        v-if="mountingFromStore">
                        Тип встраивания - {{ $t(`message.${mountingFromStore}`) }},
                        Блок питания - {{ $t(`message.${placeFromStore}`) }},
                        Управление - {{ $t(`message.${typeFromStore}`) }},
                        Цвет - {{ $t(`message.${colorFromStore}`) }}.
                    </p>
                </div>
            </div>
            <div
                v-if="!finished"
                class="d-flex align-items-center page-footer__controlers">
                <button
                    v-if="resetStepEnalbe"
                    class="btn btn-outline-secondary"
                    type="reset"
                    @click="resetStep()">
                    Сброс
                </button>
                <button
                    class="btn btn-light"
                    :class="{'btn-dark': enableNext}"
                    type="submit"
                    @click="pushTo($event)"
                    :disabled="!enableNext">
                    Продолжить
                </button>
            </div>
            <slot />
        </div>
    </footer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        enableNext: {
            type: Boolean,
            default: false,
        },
        link: {
            type: String,
            requared: true,
            default: '/',
        },
        resetStep: {
            type: Function,
            requared: false,
            default: () => false,
        },
        resetStepEnalbe: {
            type: Boolean,
            default: true,
            requared: false,
        },
        finished: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            placeFromStore: 'control_place',
            typeFromStore: 'control_type',
            colorFromStore: 'system_color',
            mountingFromStore: 'system_mounting',
            shapeFromStore: 'shape',
        }),
    },
    methods: {
        ...mapMutations([
            // `this.functionName(value)` будет вызывать `this.$store.commit('functionName', value)`
            'updateControlPlace',
            'updateControlType',
            'updateColor',
            'updateMounting',
        ]),
        pushTo(evt) {
            evt.preventDefault();
            this.$emit('push_next', this.link);
        },
    },
    created() {
        if (!this.placeFromStore) {
            const parseDetailsJson = JSON.parse(sessionStorage.getItem('configDetails'));
            /* eslint-disable camelcase */
            const {
                control_place, control_type, system_color, system_mounting,
            } = { ...parseDetailsJson };
            this.updateControlPlace(control_place);
            this.updateControlType(control_type);
            this.updateColor(system_color);
            this.updateMounting(system_mounting);
        }
    },
};
</script>

<style lang="scss" scoped>
.btn {
    margin-right: 10px;
}
</style>
