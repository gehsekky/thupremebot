const config = require('config');
const rest = require('rest');
const pathPrefix = require('rest/interceptor/pathPrefix');

const client = rest.wrap(pathPrefix, { prefix: config.get('supreme-url') });

module.exports = client;
