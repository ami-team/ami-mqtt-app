// noinspection JSUnresolvedFunction
/*--------------------------------------------------------------------------------------------------------------------*/

import 'xterm/css/xterm.css';

import {Terminal} from 'xterm';

import {FitAddon} from 'xterm-addon-fit';

/*--------------------------------------------------------------------------------------------------------------------*/

export default function createTerm()
{
    const result = new Terminal({ convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace' });

    const addon = new FitAddon();

    result.loadAddon(addon);

    result.fit = () => {

        setTimeout(() => {

            result.scrollToBottom();

            addon.fit();

        }, 100);
    };

    return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/
