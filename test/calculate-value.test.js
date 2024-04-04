const calculateValue = require('../src/calculate-value')

describe('calculateAmount', () => {
  test('Pagamento à vista, deve retornar o valor sem juros', () => {
    const amount = calculateValue.calculateAmount(100, 0.0175, 1)

    expect(amount).toBe(100)
  })

  test('4 prestações deve acrescer juros', () => {
    const amount = calculateValue.calculateAmount(500, 0.025, 4)

    expect(amount).toBe(538.45)
  })
})

describe('round valores', () => {
  test('Arredondar valores em duas casas decimais', () => {
    const amount = calculateValue.round(538.4453124999998)

    expect(amount).toBe(538.45)
  })

  test('1.005 deve retornar 1.01', () => {
    const amount = calculateValue.round(1.005)

    expect(amount).toBe(1.01)
  })
})
