// noinspection JSUnresolvedFunction,JSUnresolvedVariable
/*--------------------------------------------------------------------------------------------------------------------*/

import {v4 as uuidV4} from 'uuid';

import {requestPermission, isPermissionGranted, sendNotification} from '@tauri-apps/api/notification';

import {useToastStore} from '../stores/toast';

import {isInAMI, getAMIWebApp} from '../utilities/AMI';

import ToastContainer from '../components/ToastContainer.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

export default {

    install(app) {

        app.component('toast-container', ToastContainer);

        /**/ if(typeof(window.__TAURI__) !== 'undefined')
        {
            /*--------------------------------------------------------------------------------------------------------*/
            /*  TAURI                                                                                                 */
            /*--------------------------------------------------------------------------------------------------------*/

            app.provide('toast', async (type, body) => {

                if(await isPermissionGranted() || await requestPermission() === 'granted')
                {
                    sendNotification({
                        modalTitle: type,
                        body: body,
                    });
                }
            });

            /*--------------------------------------------------------------------------------------------------------*/
        }
        else if(isInAMI())
        {
            /*--------------------------------------------------------------------------------------------------------*/
            /* AMI                                                                                                    */
            /*--------------------------------------------------------------------------------------------------------*/

            app.provide('toast', (type, body) => {

                switch(type.toLowerCase())
                {
                case 'error':
                    getAMIWebApp().error(body);
                    break;

                case 'warning':
                    getAMIWebApp().warning(body);
                    break;

                case 'success':
                    getAMIWebApp().success(body);
                    break;

                default:
                    getAMIWebApp().info(body);
                    break;
                }
            });

            /*--------------------------------------------------------------------------------------------------------*/
        }
        else
        {
            /*--------------------------------------------------------------------------------------------------------*/

            const toastStore = useToastStore();

            app.provide('toast', (type, text) => {

                toastStore.add({
                    id: uuidV4(),
                    type: type,
                    text: text,
                });
            });

            /*--------------------------------------------------------------------------------------------------------*/
        }
    },
};

/*--------------------------------------------------------------------------------------------------------------------*/
