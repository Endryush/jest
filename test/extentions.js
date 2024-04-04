const calculateValue = require('../src/calculate-value')

expect.extend({
  sumEqualValues (items, sum) {
    const realSum = calculateValue.round(items.reduce((total, value) => total + value, 0), 2)
    const passed = realSum === calculateValue.round(sum)

    return {
      message: () => `A soma ${realSum} deve ser igual a ${sum}`,
      pass: passed
    }
  },

  beDesc (items) {
    for (let i = 0; i < items.length - 1; i++) {
      const j = i + 1
      if (items[i] < items[j]) {
        return {
          message: () => `O item "${items[i]}" não é menor ou igual ao item "${items[j]}"`,
          pass: false
        }
      }
    }

    return {
      message: () => 'O array deve estar em ordem decrescente',
      pass: true
    }
  }
})
