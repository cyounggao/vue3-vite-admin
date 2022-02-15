<template>
    <svg
        :width="(size * list.length + gap * (list.length - 1))"
        height="150"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#3c9"
    >
        <!-- 1 -->
        <rect
            v-for="(item, index) in list"
            :x="(size + gap) * index"
            y="60"
            :rx="size / 2"
            :ry="size / 2"
            :width="size"
            :height="size"
            :style="`filter: hue-rotate(${index / 9 * 0.5}turn)`"
        >
            <animate
                id="animate"
                attributeName="height"
                attributeType="XML"
                :dur="`${dur}s`"
                :begin="`${time * index}s;animate.end+${time * index}s`"
                :values="item.height"
                repeatCount="indefinite"
            />
            <animateTransform
                attributeName="transform"
                :dur="`${dur}s`"
                :begin="`${time * index}s;animate.end+${time * index}s`"
                :values="item.translate"
                repeatCount="indefinite"
            />
        </rect>
    </svg>
</template>
<script setup>
let size = 10
let gap = 4
let time = 0.11
let dur = 1.6
let list = [
    { height: '10;10;30;30;30;30;30;30;10;10', translate: '0;0;0 -15;0 -15;0 -15;0 -15;0 -15;0 -15;0;0' },
    { height: '10;10;60;60;60;60;60;60;10;10', translate: '0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0' },
    { height: '10;10;80;80;80;80;80;80;10;10', translate: '0;0;0 -40;0 -40;0 -40;0 -40;0 -40;0 -40;0;0' },
    { height: '10;10;90;90;90;90;90;90;10;10', translate: '0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0' },
    { height: '10;10;90;90;90;90;90;90;10;10', translate: '0;0;0 -20;0 -20;0 -20;0 -20;0 -20;0 -20;0;0' },
    { height: '10;10;90;90;90;90;90;90;10;10', translate: '0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0' },
    { height: '10;10;80;80;80;80;80;80;10;10', translate: '0;0;0 -40;0 -40;0 -40;0 -40;0 -40;0 -40;0;0' },
    { height: '10;10;60;60;60;60;60;60;10;10', translate: '0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0' },
    { height: '10;10;30;30;30;30;30;30;10;10', translate: '0;0;0 -15;0 -15;0 -15;0 -15;0 -15;0 -15;0;0' }
]
</script>