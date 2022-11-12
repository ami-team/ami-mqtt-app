// noinspection JSUnresolvedFunction, JSUnresolvedVariable,JSUnusedGlobalSymbols
/*--------------------------------------------------------------------------------------------------------------------*/

import AMIMQTTClient from 'ami-mqtt-client';

import {isInAMI, getAMIAuth} from '../utilities/AMI';

import SignInModal from '../components/SignInModal.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

class MQTTClient
{
    /*----------------------------------------------------------------------------------------------------------------*/

    #modal = null;
    #client = null;

    #resolve = () => {};

    /*----------------------------------------------------------------------------------------------------------------*/

    #updateTokenByModal()
    {
        /*------------------------------------------------------------------------------------------------------------*/

        if(!this.#modal)
        {
            this.#modal = new window.bootstrap.Modal(document.getElementById('C2BE0D9F_9779_84D1_EA11_023EBF2CA62F'));

            document.getElementById('DA646FB8_5E07_5DE0_1BE4_74A7893F8858').addEventListener('submit', (e) => {

                e.preventDefault();

                const jwtToken          = document.getElementById('C003DCF9_6336_8943_221F_9F1FD7451CF6').value;
                const mqttBrokerEndpoint = document.getElementById('D7CF85AE_D095_B7E6_1018_3BD727935E4D').value;
                const amiPipelineEndpoint = document.getElementById('F1742259_7FDE_DC08_127F_E4F9B809F4C6').value;

                if(jwtToken && mqttBrokerEndpoint)
                {
                    this.#resolve([jwtToken, mqttBrokerEndpoint, amiPipelineEndpoint]);

                    this.#modal.hide();
                }
            });
        }

        /*------------------------------------------------------------------------------------------------------------*/

        return new Promise((resolve) => {

            document.getElementById('C003DCF9_6336_8943_221F_9F1FD7451CF6').value = this.getJWTToken();
            document.getElementById('D7CF85AE_D095_B7E6_1018_3BD727935E4D').value = this.getMQTTBrokerEndpoint();
            document.getElementById('F1742259_7FDE_DC08_127F_E4F9B809F4C6').value = this.getAMIPipelineEndpoint();

            this.#resolve = resolve;

            this.#modal.show();
        });

        /*------------------------------------------------------------------------------------------------------------*/
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    #getConfig()
    {
        /*------------------------------------------------------------------------------------------------------------*/

        if(isInAMI())
        {
            const amiAuth = getAMIAuth()

            if(amiAuth.getJWTToken() && amiAuth.getMQTTBrokerEndpoint())
            {
                localStorage.setItem('jwtToken', amiAuth.getJWTToken());
                localStorage.setItem('mqttBrokerEndpoint', amiAuth.getJWTBrokerEndpoint());
                localStorage.setItem('amiPipelineEndpoint', amiAuth.getAMIPipelineEndpoint());

                return Promise.resolve();
            }
        }
        else
        {
            if(this.getJWTToken() && this.getMQTTBrokerEndpoint())
            {
                return Promise.resolve();
            }
        }

        /*------------------------------------------------------------------------------------------------------------*/

        return new Promise((resolve, reject) => {

            this.#updateTokenByModal().then(([jwtToken, mqttBrokerEndpoint, amiPipelineEndpoint]) => {

                if(jwtToken && mqttBrokerEndpoint)
                {
                    localStorage.setItem('jwtToken'         , (jwtToken           || '').toString());
                    localStorage.setItem('mqttBrokerEndpoint', (mqttBrokerEndpoint || '').toString());
                    localStorage.setItem('amiPipelineEndpoint', (amiPipelineEndpoint || '').toString());

                    resolve();
                }
                else
                {
                    reject('internal error 1');
                }

            }).catch(() => {

                reject('internal error 2');
            });
        });

        /*------------------------------------------------------------------------------------------------------------*/
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    #connect(updateListeners, onConnected = null, onMessageArrived = null, onConnectionLost = null)
    {
        const retry = (resolve, reject) => {

            this.#getConfig().then(() => {

                /*------------------------------------------------------------------------------------------------*/

                if(!this.#client || this.#client.getEndpoint() !== this.getMQTTBrokerEndpoint())
                {
                    this.#client = new AMIMQTTClient(this.getMQTTBrokerEndpoint(), {
                        discoveryTopic: 'ami/taskserver/ping',
                        triggerDiscoveryTopic: 'ami/taskserver/pings',
                    });
                }

                /*------------------------------------------------------------------------------------------------*/

                if(updateListeners)
                {
                    this.#client.setOnConnected/*-*/(onConnected/*-*/ || (() => {}));
                    this.#client.setOnMessageArrived(onMessageArrived || (() => {}));
                    this.#client.setOnConnectionLost(onConnectionLost || (() => {}));
                }

                /*------------------------------------------------------------------------------------------------*/

                if(this.#client.isConnected())
                {
                    if(onConnected) onConnected(this.#client);

                    resolve(this.#client);
                }
                else
                {
                    this.#client.signInByToken(this.getJWTToken()).then(() => {

                        console.log('🔌 connected');

                        resolve(this.#client);

                    }).catch(() => {

                        localStorage.setItem('jwtToken', '');

                        retry(resolve, reject);
                    });
                }

                /*------------------------------------------------------------------------------------------------*/

            }).catch((e) => {

                reject(e);
            });
        }

        return new Promise((resolve, reject) => {

            retry(resolve, reject);
        });
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    connect(onConnected, onMessageArrived, onConnectionLost)
    {
        return this.#connect(true, onConnected, onMessageArrived, onConnectionLost);
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    reconnect()
    {
        localStorage.setItem('jwtToken', '');

        if(this.#client.isConnected())
        {
            this.#client.signOut().finally(() => {

                this.#connect(false).catch((e) => {

                    console.log(e);
                });
            });
        }
        else
        {
            this.#connect(false).catch((e) => {

                console.log(e);
            });
        }
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    getJWTToken()
    {
        return localStorage.getItem('jwtToken') || '';
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    getMQTTBrokerEndpoint()
    {
        return localStorage.getItem('mqttBrokerEndpoint') || '';
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    getAMIPipelineEndpoint()
    {
        return localStorage.getItem('amiPipelineEndpoint') || '';
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    subscribe(topic, options)
    {
        return this.#client.subscribe(topic, options);
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    unsubscribe(topic, options)
    {
        return this.#client.unsubscribe(topic, options);
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    execute(command, options)
    {
        return this.#client.execute(command, options);
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    jspath(path, json)
    {
        return this.#client.jspath(path, json);
    }

    /*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default {

    install(app)
    {
        app.component('sign-in-modal', SignInModal);

        app.provide('mqttClient', new MQTTClient());
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
