/*--------------------------------------------------------------------------------------------------------------------*/

import {createPinia} from 'pinia';

import mqttClient from './plugins/mqttClient';
import toast      from './plugins/toast'     ;

/*--------------------------------------------------------------------------------------------------------------------*/

export function setupApp(app)
{
    app.use(createPinia());
    app.use(mqttClient);
    app.use(toast);
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function runApp(app, mountPoint)
{
    if(typeof(window.amiWebApp) === 'undefined')
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
        window.ami_mount = (mountPoint) => {

            app.mount(mountPoint);
        };
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/
