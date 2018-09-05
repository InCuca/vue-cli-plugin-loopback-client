const dependencies = require('./dependencies');
const devDependencies = require('./devDependencies');
const scripts = require('./scripts');

function generator(api) {
  api.extendPackage({ dependencies, devDependencies, scripts });
}

module.exports = generator;
