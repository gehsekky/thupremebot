const ThupremeBot = require('../thupremebot');

describe('ThupremeBot', () => {
  it('should instantiate with no errors', () => {
    expect(() => {
      new ThupremeBot();
    }).not.toThrow();
  });
});
