import axios from 'axios';

export const entityTypes = {
    GENE: 'GENE',
    PHENOTYPE: 'PHENOTYPE',
    VARIANT: 'VARIANT',
    ANATOMY_TERM: 'ANATOMY_TERM',
    LIFE_STAGE: 'LIFE_STAGE',
    CELLULAR_COMPONENT: 'CELLULAR_COMPONENT'
};

export class Autocomplete {
    constructor() {
        this.acType = {
            [entityTypes.GENE]: 'gene',
            [entityTypes.PHENOTYPE]: 'phenotype',
            [entityTypes.VARIANT]: 'variation',
            [entityTypes.ANATOMY_TERM]: 'wbbt',
            [entityTypes.LIFE_STAGE]: 'wbls',
            [entityTypes.CELLULAR_COMPONENT]: 'gocc'
        };
    }


    /**
     * search entities through the autocomplete
     * @param {entityTypes} entityType: type of entity to search
     * @param {string} matchString: string to search
     * @returns {Promise} returns a promise that resolves in a list of entities, each of which is an object with two
     * key-value pairs, *value* and *modId*
     */
    searchEntities(entityType, matchString) {
        throw new Error('Can\'t call method from abstract class');
    }
}

export class WBAutocomplete extends Autocomplete {

    constructor(baseEndpoint) {
        super();
        this.baseEndpoint = baseEndpoint;
    }

    searchEntities(entityType, matchString) {
        let apiEndpoint = `${this.baseEndpoint}${this.acType[entityType]}&userValue=${matchString}`;
        return new Promise((resolve, reject) => {
            axios
                .get(apiEndpoint)
                .then(res => {
                    if (res) {
                        resolve(this.getEntities(res.data));
                    } else {
                        reject("Failed getting data from autocomplete endpoint");
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * transform the result of an autocomplete call into a list of entities.
     *
     * @param {string} autocompleteRes
     * @returns a list of entity objects
     */
    getEntities(autocompleteRes) {
        const addInfoRegex = / \( ([^ ]+) \)( \[[^ ]+\])? $/;
        let value;
        let modId;
        let results = [];
        let splitStr;
        for (splitStr of autocompleteRes.split('\n').filter(s => s !== '')) {
            if (addInfoRegex.test(splitStr)) {
                modId = addInfoRegex.exec(splitStr)[1];
                modId = modId.replace(':', '');
                value = splitStr.replace(addInfoRegex, "");
                results.push({value: value, modId: modId});
            } else {
                results.push({value: splitStr, modId: ''});
            }
        }
        return results;
    }
}