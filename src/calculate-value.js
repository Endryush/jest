function calculateAmount (capital, tax, period) {
  const amount = capital * Math.pow((1 + tax), period - 1)

  return round(amount)
}

function round (value) {
  const percent = 100

  return Math.round((value + Number.EPSILON) * percent) / percent
}

module.exports = {
  calculateAmount,
  round
}
