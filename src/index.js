/*--------------------------------------------------------------------------------------------------------------------*/

import AppComponent from './components/AppComponent.vue';

import ButtonModal from './components/ButtonModal.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

import toast from './plugins/toast';

import mqttClient from './plugins/mqttClient';

import {isInAMI, getAMIWebApp, getAMIAuth, getAMI, isInAMI} from './utilities/AMI';

import toPureJson from './utilities/toPureJson';

/*--------------------------------------------------------------------------------------------------------------------*/

function setupApp(app)
{
    app.use(toast);
    app.use(mqttClient);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function runApp(app, mountPoint)
{
    if(!isInAMI())
    {
        import('bootstrap/dist/css/bootstrap.css').then(() => {

            import('bootstrap-icons/font/bootstrap-icons.css').then(() => {

                import('bootstrap/dist/js/bootstrap.esm.min.js').then((bootstrap) => {

                    window.bootstrap = bootstrap;

                    app.mount(mountPoint);
                });
            });
        });
    }
    else
    {
        getAMI().mount = (mountPoint) => {

            app.mount(mountPoint);
        };
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

export {
    setupApp, runApp,
    AppComponent, ButtonModal,
    isInAMI, getAMIWebApp, getAMIAuth, getAMI,
    toPureJson,
};

/*--------------------------------------------------------------------------------------------------------------------*/
