<!--suppress JSUnresolvedVariable -->
<!-- *************************************************************************************************************** -->

<script setup>

/*--------------------------------------------------------------------------------------------------------------------*/

import {inject} from 'vue';

import {isInAMI} from '../utilities/AMI';

/*--------------------------------------------------------------------------------------------------------------------*/

const mqttClient = inject('mqttClient');

/*--------------------------------------------------------------------------------------------------------------------*/

const height = `calc(100vh - ${isInAMI() ? 12.25 : 0.0}rem)`;

/*--------------------------------------------------------------------------------------------------------------------*/

</script>

<!-- *************************************************************************************************************** -->

<template>
    <div class="d-flex">
        <div class="d-flex flex-column" :style="{'height': height, 'width': '4.5rem'}">

            <ul class="nav nav-pills nav-flush flex-grow-1 flex-column justify-content-start text-center bg-light">

                <slot></slot>

            </ul>
            <ul class="nav nav-pills nav-flush flex-grow-0 flex-column justify-content-start text-center bg-dark">

                <li class="nav-item" title="Reconnect">
                    <span class="nav-link text-light rounded-0 py-2" style="cursor: pointer;" @click="mqttClient.reconnect">
                        <i class="bi bi-plugin" style="font-size: 1.5rem;"></i>
                    </span>
                </li>

            </ul>

        </div>
        <div :style="{'height': height, 'width': 'calc(100% - 4.5rem)', 'overflow-x': 'hidden', 'overflow-y': 'scroll'}">

            <router-view :key="$route.path" />

        </div>
    </div>

    <toast-container />

    <sign-in-modal />

</template>

<!-- *************************************************************************************************************** -->
