/*--------------------------------------------------------------------------------------------------------------------*/

import AppComponent from '@/components/AppComponent';

import ButtonModal from '@/components/ButtonModal';

/*--------------------------------------------------------------------------------------------------------------------*/

import toast from '@/plugins/toast';

import mqttClient from '@/plugins/mqttClient';

/*--------------------------------------------------------------------------------------------------------------------*/

function setupApp(app)
{
    app.use(toast);
    app.use(mqttClient);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function runApp(app, mountPoint)
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

export {setupApp, runApp, AppComponent, ButtonModal};

/*--------------------------------------------------------------------------------------------------------------------*/
