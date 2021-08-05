<template>
    <div
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div
            :class="{'alert': toast.alert}"
            class="toast-header">
            <img
                v-if="toast.img"
                :src="toast.img"
                class="rounded me-2"
                alt="">
            <strong class="me-auto">{{ toast.name }}</strong>
            <small class="text-muted">{{ toast.time }}</small>
            <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="toast"
                aria-label="Close" />
        </div>
        <div class="toast-body">
            {{ toast.text }}
        </div>
    </div>
</template>

<script>
import { Toast } from 'bootstrap';

export default {
    props: {
        toast: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            toastInstance: null,
        };
    },
    mounted() {
        this.toastInstance = new Toast(this.$el,
            {
                animation: true,
                delay: this.toast.delay,
                autohide: this.toast.autohide,
            });

        setTimeout(() => {
            this.toastInstance.show();
        }, 600);
    },
};
</script>

<style lang="scss">
    .toast-relative {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 350px;
        pointer-events: none;

        .toast-container {
            position: absolute;
            top: 0;
            bottom: 100px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .toast {
            transition: 0.65s;
            transition-delay: 0.4s;

            .toast-header {
                background-color: #000;
                color: #fff;
                &.alert {
                    background-color: #DC3545;
                    color: #fff;
                }
            }
        }
    }
</style>
