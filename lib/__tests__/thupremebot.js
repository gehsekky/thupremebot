const ThupremeBot = require('../thupremebot');

describe('ThupremeBot', () => {

  it('should instantiate with no errors', () => {
    expect(() => {
      new ThupremeBot();
    }).not.toThrow();
  });

  it('should get items', () => {
    const thupreme = new ThupremeBot();
    expect(thupreme.getItems()).resolves.toBeTruthy();
  });
});
