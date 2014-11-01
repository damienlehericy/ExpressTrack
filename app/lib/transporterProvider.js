/**
 * Transporters informations
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 */
var libraries = {
    colissimo: {
        name: 'colissimo',
        method: 'GET',
        request: {
            protocol: 'http',
            domain: 'yanisadouiudy.power-heberg.com',
            path: '/api_colissimo/',
            params: '?code='
        }
    }
};
exports.providers = function (name) {
    "use strict";
    switch (name) {
	    case 'colissimo':
	        return libraries.colissimo;
	        break;
    }
};