// noinspection JSUnresolvedFunction, JSUnresolvedVariable,JSUnusedGlobalSymbols
/*--------------------------------------------------------------------------------------------------------------------*/

import AMIMQTTClient from 'ami-mqtt-client';

import SignInModal from '../components/SignInModal.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const _amiAuth = window.amiAuth;

/*--------------------------------------------------------------------------------------------------------------------*/

class MQTTClient
{
    /*----------------------------------------------------------------------------------------------------------------*/

    #modal = null;
    #client = null;

    #resolve = () => {};

    /*----------------------------------------------------------------------------------------------------------------*/

    #updateTokenByModal = () => {

        /*------------------------------------------------------------------------------------------------------------*/

        if(!this.#modal)
        {
            this.#modal = new window.bootstrap.Modal(document.getElementById('C2BE0D9F_9779_84D1_EA11_023EBF2CA62F'));

            document.getElementById('DA646FB8_5E07_5DE0_1BE4_74A7893F8858').addEventListener('submit', (e) => {

                e.preventDefault();

                const mqttToken = document.getElementById('mqttTokenInput').value;
                const mqttBrokerEndpoint = document.getElementById('mqttBrokerEndpointInput').value;
                const amiPipelineEndpoint = document.getElementById('amiPipelineEndpointInput').value;

                if(mqttToken && mqttBrokerEndpoint)
                {
                    this.#resolve([mqttToken, mqttBrokerEndpoint, amiPipelineEndpoint]);

                    this.#modal.hide();
                }
            });
        }

        /*------------------------------------------------------------------------------------------------------------*/

        return new Promise((resolve) => {

            document.getElementById('mqttTokenInput').value = this.getMQTTToken();
            document.getElementById('mqttBrokerEndpointInput').value = this.getMQTTEndpoint();
            document.getElementById('amiPipelineEndpointInput').value = this.getAMIPipelineEndpoint();

            this.#resolve = resolve;

            this.#modal.show();
        });

        /*------------------------------------------------------------------------------------------------------------*/
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    #getConfig()
    {
        /*------------------------------------------------------------------------------------------------------------*/

        if(typeof(_amiAuth) === 'undefined')
        {
            if(this.getMQTTToken() && this.getMQTTEndpoint())
            {
                return Promise.resolve();
            }
        }
        else
        {
            if(_amiAuth.getMqttToken() && _amiAuth.getMqttBrokerEndpoint())
            {
                localStorage.setItem('mqttToken', _amiAuth.getMqttToken());
                localStorage.setItem('mqttBrokerEndpoint', _amiAuth.getMqttBrokerEndpoint());
                localStorage.setItem('amiPipelineEndpoint', _amiAuth.getAMIPipelineEndpoint());

                return Promise.resolve();
            }
        }

        /*------------------------------------------------------------------------------------------------------------*/

        return new Promise((resolve, reject) => {

            this.#updateTokenByModal().then(([mqttToken, mqttBrokerEndpoint, amiPipelineEndpoint]) => {

                if(mqttToken && mqttBrokerEndpoint)
                {
                    localStorage.setItem('mqttToken', (mqttToken || '').toString());
                    localStorage.setItem('mqttBrokerEndpoint', (mqttBrokerEndpoint || '').toString());
                    localStorage.setItem('amiPipelineEndpoint', (amiPipelineEndpoint || '').toString());

                    resolve();
                }
                else
                {
                    reject('internal error');
                }
            }).catch(() => {

                reject('internal error');
            });
        });

        /*------------------------------------------------------------------------------------------------------------*/
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    #connect(updateListeners, onConnected, onMessageArrived, onConnectionLost)
    {
        return new Promise((resolve, reject) => {

            this.#getConfig().then(() => {

                /*----------------------------------------------------------------------------------------------------*/

                if(!this.#client || this.#client.getEndpoint() !== this.getMQTTEndpoint())
                {
                    this.#client = new AMIMQTTClient(this.getMQTTEndpoint(), {
                        discoveryTopic: 'ami/taskserver/ping',
                        triggerDiscoveryTopic: 'ami/taskserver/pings',
                    });
                }

                /*----------------------------------------------------------------------------------------------------*/

                if(updateListeners)
                {
                    this.#client.setOnConnected(onConnected || (() => {}));
                    this.#client.setOnMessageArrived(onMessageArrived || (() => {}));
                    this.#client.setOnConnectionLost(onConnectionLost || (() => {}));
                }

                /*----------------------------------------------------------------------------------------------------*/

                if(this.#client.isConnected())
                {
                    if(onConnected)
                    {
                        onConnected(this.#client);

                        resolve(this.#client);
                    }
                }
                else
                {
                    this.#client.signInByToken(this.getMQTTToken()).then(() => {

                        resolve(this.#client);

                    }).catch((e) => {

                        reject(e);
                    });
                }

                /*----------------------------------------------------------------------------------------------------*/

            }).catch((e) => {

                reject(e);
            })
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
        localStorage.setItem('mqttToken', '');

        if(this.#client)
        {
            this.#client.signOut().finally(() => {

                this.#connect(false, null, null, null).finally(() => {

                    console.log('🔌 reconnected');
                });
            });
        }
        else
        {
            this.#connect(false, null, null, null).finally(() => {

                console.log('🔌 reconnected');
            });
        }
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    getMQTTToken()
    {
        return localStorage.getItem('mqttToken') || '';
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    getMQTTEndpoint()
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
