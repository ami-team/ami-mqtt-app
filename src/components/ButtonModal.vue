<!-- *************************************************************************************************************** -->

<script setup>

/*--------------------------------------------------------------------------------------------------------------------*/

import {computed} from 'vue';

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
    onConfirmText: {
        type: String,
        default: 'Confirm',
    },
    onConfirm: {
        type: Function,
        default: () => {},
    },
    onCancelText: {
        type: String,
        default: 'Cancel',
    },
    onCancel: {
        type: Function,
        default: () => {},
    },
});

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

</script>

<!-- *************************************************************************************************************** -->

<template>
    <div>

        <span class="text-muted" v-if="props.link && props.disabled">
            <slot></slot>
        </span>

        <a href="#" data-bs-toggle="modal" :data-bs-target="`#modal-${id}`" v-if="props.link && !props.disabled">
            <slot></slot>
        </a>

        <button :class="`${computedButtonClass}`" data-bs-toggle="modal" :data-bs-target="`#modal-${id}`" :disabled="props.disabled" v-else>
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
                        <form class="modal-body" :id="`form-${id}`" @submit="onConfirm()">
                            <slot name="textDescription">
                                {{ modalText }}
                            </slot>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" @onclick="onCancel()">
                                {{ onCancelText }}
                            </button>
                            <button class="btn btn-primary" type="submit" data-bs-dismiss="modal" :form="`form-${id}`">
                                {{ onConfirmText }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

    </div>
</template>

<!-- *************************************************************************************************************** -->
