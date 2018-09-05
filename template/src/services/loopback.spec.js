import lb from './loopback';

describe('loopback', () => {
  it('export extended axios', () => {
    expect(lb).toEqual(expect.any(Function));
    expect(lb.find).toEqual(expect.any(Function));
    expect(lb.removeToken).toEqual(expect.any(Function));
    expect(lb.setToken).toEqual(expect.any(Function));
    expect(lb.setLoadingFunction).toEqual(expect.any(Function));
  });
});
