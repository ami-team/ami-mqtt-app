<!-- *************************************************************************************************************** -->

<script setup>

/*--------------------------------------------------------------------------------------------------------------------*/

import {computed} from 'vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    data: Object
});

/*--------------------------------------------------------------------------------------------------------------------*/

const colorVariant = computed(() => {

    switch(props.data.type)
    {
        case 'error':
            return 'danger';

        case 'warning':
            return 'warning';

        case 'success':
            return 'success';

        default:
            return 'info';
    }
});

/*--------------------------------------------------------------------------------------------------------------------*/

</script>

<!-- *************************************************************************************************************** -->

<template>
    <div class="toast show shadow border-0" :id="data.id" role="alert">
        <div :class="`toast-header bg-${colorVariant}`">
            <strong class="text-white me-auto ">
                {{ data.type }} <span class="badge rounded-pill bg-dark" v-if="data.counter > 1">{{ data.counter }}</span>
            </strong>
            <button class="btn-close btn-close-white ms-auto" type="button" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            {{ data.text }}
        </div>
    </div>
</template>

<!-- *************************************************************************************************************** -->
