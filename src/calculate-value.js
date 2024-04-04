function calculateAmount (capital, tax, period) {
  const amount = capital * Math.pow((1 + tax), period - 1)

  return round(amount)
}

function round (value) {
  const percent = 100

  return Math.round((value + Number.EPSILON) * percent) / percent
}

function calculateInstallments (value, qtyInstallments) {
  const baseInstallment = round(value / qtyInstallments)
  const result = Array(qtyInstallments).fill(baseInstallment)

  let sumInstallments = result.reduce((a, t) => a + t)
  let diff = round(value - sumInstallments)
  const factor = diff > 0 ? 1 : -1

  let i = diff > 0 ? 0 : result.length - 1
  while (diff !== 0) {
    result[i] = round(result[i] + (0.01 * factor))
    sumInstallments = result.reduce((a, t) => a + t)
    diff = round(value - sumInstallments)
    i += factor
  }

  return result
}

module.exports = {
  calculateAmount,
  round,
  calculateInstallments
}
