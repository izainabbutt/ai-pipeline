function calculateTip(bill, tipPercent, numPeople) {
  const b = Number(bill) || 0;
  const t = Number(tipPercent) || 0;
  const p = Number(numPeople) >= 1 ? Number(numPeople) : 1;
  const tip = b * (t / 100);
  const total = b + tip;
  const perPerson = total / p;
  return { tip, total, perPerson };
}

function formatAmount(value) {
  return Number(value).toFixed(2);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateTip, formatAmount };
}
