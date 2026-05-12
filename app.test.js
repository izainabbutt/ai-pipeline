const { calculateTip, formatAmount } = require('./calc');

describe('calculateTip', () => {
  test('bill 100 with 18% tip gives tip of 18.00', () => {
    const { tip, total } = calculateTip(100, 18, 1);
    expect(tip).toBe(18);
    expect(total).toBe(118);
  });

  test('bill 100 with 18% split 2 ways gives 59.00 per person', () => {
    const { perPerson } = calculateTip(100, 18, 2);
    expect(perPerson).toBe(59);
  });

  test('changing people count updates per-person correctly', () => {
    expect(calculateTip(120, 20, 1).perPerson).toBe(144);
    expect(calculateTip(120, 20, 2).perPerson).toBe(72);
    expect(calculateTip(120, 20, 3).perPerson).toBe(48);
    expect(calculateTip(120, 20, 4).perPerson).toBe(36);
  });

  test('custom tip percentage is used for calculation', () => {
    const { tip, total } = calculateTip(100, 25, 1);
    expect(tip).toBe(25);
    expect(total).toBe(125);
  });

  test('custom tip with split', () => {
    const { tip, total, perPerson } = calculateTip(80, 15, 2);
    expect(tip).toBe(12);
    expect(total).toBe(92);
    expect(perPerson).toBe(46);
  });

  test('10% tip calculation', () => {
    const { tip, total } = calculateTip(200, 10, 1);
    expect(tip).toBe(20);
    expect(total).toBe(220);
  });

  test('15% tip calculation', () => {
    const { tip, total, perPerson } = calculateTip(60, 15, 3);
    expect(tip).toBe(9);
    expect(total).toBe(69);
    expect(perPerson).toBe(23);
  });

  test('20% tip calculation', () => {
    const { tip, total } = calculateTip(50, 20, 1);
    expect(tip).toBe(10);
    expect(total).toBe(60);
  });

  test('decimal bill amount', () => {
    const { tip, total } = calculateTip(45.5, 18, 1);
    expect(tip).toBeCloseTo(8.19, 2);
    expect(total).toBeCloseTo(53.69, 2);
  });

  test('zero bill returns all zeros', () => {
    const { tip, total, perPerson } = calculateTip(0, 18, 1);
    expect(tip).toBe(0);
    expect(total).toBe(0);
    expect(perPerson).toBe(0);
  });

  test('reset state returns zeros formatted as 0.00', () => {
    const { tip, total, perPerson } = calculateTip(0, 0, 1);
    expect(formatAmount(tip)).toBe('0.00');
    expect(formatAmount(total)).toBe('0.00');
    expect(formatAmount(perPerson)).toBe('0.00');
  });

  test('bill 100 split 4 ways at 18%', () => {
    const { perPerson } = calculateTip(100, 18, 4);
    expect(perPerson).toBeCloseTo(29.5, 2);
  });

  test('numPeople defaults to 1 when invalid', () => {
    const single = calculateTip(100, 10, 1);
    const invalid = calculateTip(100, 10, 0);
    expect(invalid.perPerson).toBe(single.perPerson);
  });
});

describe('formatAmount', () => {
  test('formats integer as two decimal places', () => {
    expect(formatAmount(18)).toBe('18.00');
    expect(formatAmount(0)).toBe('0.00');
    expect(formatAmount(118)).toBe('118.00');
  });

  test('formats decimal to two places', () => {
    expect(formatAmount(29.5)).toBe('29.50');
    expect(formatAmount(8.19)).toBe('8.19');
  });

  test('rounds to two decimal places', () => {
    expect(formatAmount(1.006)).toBe('1.01');
  });
});
