<template>
    <div class="configurator">
        <h1 class="visually-hidden">
            Configurator Infinity
        </h1>
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
}

.fade-enter-active {
    transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.configurator {
    height: 100%;
}
</style>
