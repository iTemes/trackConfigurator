<template>
    <svg
        class="subproduct-angle-icon"
        :width="width"
        :height="height"
        viewBox="0 0 500 500"
        :aria-labelledby="iconName"
        role="presentation">
        <title
            :id="iconName"
            lang="en">{{ iconName }} icon</title>
        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'box',
        },
        width: {
            type: [Number, String],
            default: 50,
        },
        height: {
            type: [Number, String],
            default: 50,
        },
        iconColor: {
            type: String,
            default: 'currentColor',
        },
    },
};
</script>
