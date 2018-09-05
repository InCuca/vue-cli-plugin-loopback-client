const Generator = require('@vue/cli/lib/Generator');
const GeneratorAPI = require('@vue/cli/lib/GeneratorAPI');

const scripts = require('./scripts');
const dependencies = require('./dependencies');
const devDependencies = require('./devDependencies');
const generate = require('./generator');

describe('generator', () => {
  let id = 1;
  let api;

  function createApi(options = {}, rootOptions = {}) {
    const defGenerator = new Generator();
    const genApi = new GeneratorAPI(id, defGenerator, options, rootOptions);
    id += 1;
    return genApi;
  }

  beforeEach(() => {
    api = createApi();
  });

  it('change package json', () => {
    generate(api);
    expect(api.generator.pkg).toMatchObject({
      scripts: expect.objectContaining(scripts),
      dependencies: expect.objectContaining(dependencies),
      devDependencies: expect.objectContaining(devDependencies),
    });
  });
});
