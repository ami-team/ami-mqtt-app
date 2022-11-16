<!-- *************************************************************************************************************** -->

<script setup>

/*--------------------------------------------------------------------------------------------------------------------*/

import {ref, computed, onMounted} from 'vue';

import {v4 as uuidV4} from 'uuid';

/*--------------------------------------------------------------------------------------------------------------------*/

const id = uuidV4();

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    link: {
        type: Boolean,
        default: false,
    },
    /* button */
    buttonSize: {
        type: String,
        default: '',
    },
    buttonOutline: {
        type: Boolean,
        default: false,
    },
    buttonColor: {
        type: String,
        default: 'primary',
    },
    buttonDisabled: {
        type: Boolean,
        default: false,
    },
    /* modal */
    modalSize: {
        type: String,
        default: '',
    },
    modalIcon: {
        type: String,
        default: '',
    },
    modalTitle: {
        type: String,
        default: 'Are you sure you want to do this?',
    },
    modalText: {
        type: String,
        default: 'Are you sure you want to do this?',
    },
    /* events */
    confirmText: {
        type: String,
        default: 'Confirm',
    },
    cancelText: {
        type: String,
        default: 'Cancel',
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const emit = defineEmits([
    'confirm',
    'cancel',
]);

/*--------------------------------------------------------------------------------------------------------------------*/

const confirmRef = ref(null);
const cancelRef = ref(null);

/*--------------------------------------------------------------------------------------------------------------------*/

const computedButtonClass = computed(() => {

    if(props.buttonSize)
    {
        return props.buttonOutline ? `btn btn-${props.buttonSize} btn-outline-${props.buttonColor}`
                                   : `btn btn-${props.buttonSize} btn-${props.buttonColor}`
        ;
    }
    else
    {
        return props.buttonOutline ? `btn btn-outline-${props.buttonColor}`
                                   : `btn btn-${props.buttonColor}`
        ;
    }
});

/*--------------------------------------------------------------------------------------------------------------------*/

const computedModalClass = computed(() => {

    return props.modalSize ? `modal modal-${props.modalSize} fade`
                           : 'modal fade'
    ;
});

/*--------------------------------------------------------------------------------------------------------------------*/

onMounted(() => {

    confirmRef.value.addEventListener('submit', (e) => {

        e.preventDefault();

        emit('confirm', e);
    });

    cancelRef.value.addEventListener('click', (e) => {

        e.preventDefault();

        emit('cancel', e);
    });
});

/*--------------------------------------------------------------------------------------------------------------------*/

</script>

<!-- *************************************************************************************************************** -->

<template>
    <div>

        <span class="text-muted" v-if="link && buttonDisabled">
            <slot></slot>
        </span>

        <a href="#" data-bs-toggle="modal" :data-bs-target="`#modal-${id}`" v-if="link && !buttonDisabled">
            <slot></slot>
        </a>

        <button :class="`${computedButtonClass}`" data-bs-toggle="modal" :data-bs-target="`#modal-${id}`" :disabled="buttonDisabled" v-else>
            <slot></slot>
        </button>

        <Teleport to="body">
            <div :class="`${computedModalClass}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" :id="`modal-${id}`">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i :class="`bi bi-${modalIcon}`"></i> {{ modalTitle }}
                            </h5>
                        </div>
                        <form class="modal-body" :id="`form-${id}`" ref="confirmRef">
                            <slot name="textDescription">
                                {{ modalText }}
                            </slot>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" ref="cancelRef">
                                {{ cancelText }}
                            </button>
                            <button class="btn btn-primary" type="submit" data-bs-dismiss="modal" :form="`form-${id}`">
                                {{ confirmText }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

    </div>
</template>

<!-- *************************************************************************************************************** -->
