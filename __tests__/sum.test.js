const sum = require('./sum');

describe('#Testing', () => {
  it('Expects 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(34);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(3);
  });
  it('Expects 2 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(32);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(3);
  });
  it('Expects 3 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(31);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBe(3);
  });
});