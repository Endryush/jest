const calculateValue = require('../src/calculate-value')
require('./extentions')

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

describe('calculateInstallments', () => {
  test('O número de parcelas é igual ao número de prestações', () => {
    const qtyInstallments = 6
    const installments = calculateValue.calculateInstallments(200, qtyInstallments)

    expect(installments.length).toBe(qtyInstallments)
  })

  test('Uma única prestação, valor deve ser igual ao montante', () => {
    const qtyInstallments = 1
    const installments = calculateValue.calculateInstallments(50, qtyInstallments)

    expect(installments.length).toBe(qtyInstallments)
    expect(installments[0]).toBe(50)
  })

  test('Duas prestações o valor é igual à metade do valor total', () => {
    const qtyInstallments = 2
    const installments = calculateValue.calculateInstallments(50, qtyInstallments)

    expect(installments.length).toBe(qtyInstallments)
    expect(installments[0]).toBe(25)
    expect(installments[1]).toBe(25)
  })

  test('Valor da soma das prestações deve ser igual ao montante com duas casas decimais', () => {
    // Given
    const qtyInstallments = 3
    const amount = 100

    // When
    const installments = calculateValue.calculateInstallments(amount, qtyInstallments)

    // Then
    expect(installments.length).toBe(qtyInstallments)
    const sum = calculateValue.round(installments.reduce((total, value) => total + value, 0), 2)

    expect(sum).toBe(amount)

    for (let i = 0; i < installments.length - 1; i++) {
      const j = i + 1
      expect(installments[i]).toBeGreaterThanOrEqual(installments[j])
    }
  })

  test('Valida se informações de parcelamento estão corretas', () => {
    // Given
    const qtyInstallments = 3
    const amount = 101.994

    // When
    const installments = calculateValue.calculateInstallments(amount, qtyInstallments)

    // Then
    expect(installments.length).toBe(qtyInstallments)
    expect(installments).sumEqualValues(amount)

    expect(installments).beDesc()
  })
})
