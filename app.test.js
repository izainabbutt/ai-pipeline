'use strict';

// Pure calculation functions (mirrors index.html inline script)
function calculateTip(bill, tipPercent) {
  return bill * tipPercent / 100;
}

function calculateTotal(bill, tipPercent) {
  return bill + calculateTip(bill, tipPercent);
}

function calculatePerPerson(bill, tipPercent, people) {
  if (people < 1) return 0;
  return calculateTotal(bill, tipPercent) / people;
}

describe('calculateTip', () => {
  test('bill 100 at 18% gives tip 18.00', () => {
    expect(calculateTip(100, 18)).toBeCloseTo(18.00, 2);
  });

  test('bill 100 at 10% gives tip 10.00', () => {
    expect(calculateTip(100, 10)).toBeCloseTo(10.00, 2);
  });

  test('bill 100 at 15% gives tip 15.00', () => {
    expect(calculateTip(100, 15)).toBeCloseTo(15.00, 2);
  });

  test('bill 100 at 20% gives tip 20.00', () => {
    expect(calculateTip(100, 20)).toBeCloseTo(20.00, 2);
  });

  test('bill 0 gives tip 0', () => {
    expect(calculateTip(0, 18)).toBe(0);
  });

  test('custom tip percent is used correctly', () => {
    expect(calculateTip(50, 25)).toBeCloseTo(12.50, 2);
  });

  test('decimal bill amount works', () => {
    expect(calculateTip(45.75, 18)).toBeCloseTo(8.235, 3);
  });
});

describe('calculateTotal', () => {
  test('bill 100 at 18% gives total 118.00', () => {
    expect(calculateTotal(100, 18)).toBeCloseTo(118.00, 2);
  });

  test('bill 0 gives total 0', () => {
    expect(calculateTotal(0, 15)).toBe(0);
  });

  test('bill 200 at 20% gives total 240.00', () => {
    expect(calculateTotal(200, 20)).toBeCloseTo(240.00, 2);
  });
});

describe('calculatePerPerson', () => {
  test('bill 100 at 18% split 2 ways gives 59.00 per person', () => {
    expect(calculatePerPerson(100, 18, 2)).toBeCloseTo(59.00, 2);
  });

  test('bill 100 at 18% split 1 way gives 118.00 per person', () => {
    expect(calculatePerPerson(100, 18, 1)).toBeCloseTo(118.00, 2);
  });

  test('changing number of people updates per-person amount', () => {
    const total = calculateTotal(120, 15); // 138.00
    expect(calculatePerPerson(120, 15, 2)).toBeCloseTo(total / 2, 2);
    expect(calculatePerPerson(120, 15, 3)).toBeCloseTo(total / 3, 2);
    expect(calculatePerPerson(120, 15, 6)).toBeCloseTo(total / 6, 2);
  });

  test('bill 0 gives 0 per person', () => {
    expect(calculatePerPerson(0, 18, 4)).toBe(0);
  });

  test('returns 0 for invalid people count (< 1)', () => {
    expect(calculatePerPerson(100, 18, 0)).toBe(0);
  });
});

describe('reset behaviour', () => {
  test('bill 0 and any tip gives tip amount 0.00', () => {
    expect(calculateTip(0, 18)).toBe(0);
  });

  test('bill 0 gives total 0.00', () => {
    expect(calculateTotal(0, 18)).toBe(0);
  });

  test('bill 0 split any ways gives 0.00 per person', () => {
    expect(calculatePerPerson(0, 18, 3)).toBe(0);
  });
});

describe('custom tip', () => {
  test('custom 0% tip gives tip amount 0', () => {
    expect(calculateTip(100, 0)).toBe(0);
  });

  test('custom 12.5% tip on 80 bill', () => {
    expect(calculateTip(80, 12.5)).toBeCloseTo(10.00, 2);
  });

  test('custom tip flows through to total and per-person', () => {
    const bill = 100, tip = 22, people = 4;
    expect(calculateTotal(bill, tip)).toBeCloseTo(122.00, 2);
    expect(calculatePerPerson(bill, tip, people)).toBeCloseTo(30.50, 2);
  });
});
