// noinspection JSUnresolvedFunction,JSUnresolvedVariable
/*--------------------------------------------------------------------------------------------------------------------*/

import {v4 as uuidV4} from 'uuid';

import {requestPermission, isPermissionGranted, sendNotification} from '@tauri-apps/api/notification';

import ToastContainer from '../components/ToastContainer.vue';

import {useToastStore} from '../stores/toast';

/*--------------------------------------------------------------------------------------------------------------------*/

const _amiWebApp = window.amiWebApp;

/*--------------------------------------------------------------------------------------------------------------------*/

function getStack()
{
    try
    {
        _throwError();
    }
    catch(e1)
    {
        try
        {
            return e1.stack;
        }
        catch(e2)
        {
            return ((('')));
        }
    }
}

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
        else if(typeof(_amiWebApp) !== 'undefined')
        {
            /*--------------------------------------------------------------------------------------------------------*/
            /* AMI                                                                                                    */
            /*--------------------------------------------------------------------------------------------------------*/

            app.provide('toast', (type, body) => {

                switch(type.toLowerCase())
                {
                case 'error':
                    _amiWebApp.error(body);
                    break;

                case 'warning':
                    _amiWebApp.warning(body);
                    break;

                case 'success':
                    _amiWebApp.success(body);
                    break;

                default:
                    _amiWebApp.info(body);
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

                let lines = getStack().split('\n');

                if(lines.length > 3)
                {
                    console.log(`${type}: ${lines[3]}`); // eslint-disable-line no-console
                }

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
