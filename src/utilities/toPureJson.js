// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Turn an AMI command into a pure JSON object.
 */

export default function toPureJson(obj) {

    const result = [];

    if(typeof obj === 'object')
    {
        try
        {
            obj.forEach((row) => {

                const rows = {};

                row.field.forEach((el) => {

                    rows[el['@name']] = el.$;
                });

                result.push(rows);
            });
        }
        catch(e)
        {
            console.log(e);
        }
    }

    return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/
