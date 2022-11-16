// noinspection JSUnresolvedVariable
/*--------------------------------------------------------------------------------------------------------------------*/

export function isInAMI()
{
    return typeof(window.amiWebApp) !== 'undefined' && typeof(window.amiAuth) !== 'undefined' && typeof(window.ami) !== 'undefined';
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function getAMIWebApp()
{
    return window.amiWebApp;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function getAMIAuth()
{
    return window.amiAuth;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function getAMI()
{
    return window.ami;
}

/*--------------------------------------------------------------------------------------------------------------------*/
