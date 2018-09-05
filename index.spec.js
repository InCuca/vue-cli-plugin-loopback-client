const service = require('./index.js');

describe('service', () => {
    it('exports a function', () => {
        expect(service).toBe(expect.any(Function));
    });
});