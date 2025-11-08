import { z } from 'zod'

// Ano corrente calculado dinamicamente
const currentYear = new Date().getFullYear()

// Data de abertura da loja (20/03/2020)
const storeOpeningDate = new Date(2020, 2, 20)   // Mês 2 = Março
const today = new Date()

// Cores válidas
const coresValidas = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA',
  'MARROM', 'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]

const Car = z.object({

  brand: z.string()
    .trim()
    .min(1, { message: 'A marca deve conter ao menos 1 caractere.' })
    .max(25, { message: 'A marca pode conter no máximo 25 caracteres.' }),

  model: z.string()
    .trim()
    .min(1, { message: 'O modelo deve conter ao menos 1 caractere.' })
    .max(25, { message: 'O modelo pode conter no máximo 25 caracteres.' }),

  color: z.enum(coresValidas, {
    message: 'Cor inválida. Selecione uma cor disponível.'
  }),

  year_manufacture: z.number({
      invalid_type_error: 'O ano de fabricação deve ser um número.'
    })
    .int({ message: 'O ano de fabricação deve ser um número inteiro.' })
    .min(1960, { message: 'O ano de fabricação não pode ser anterior a 1960.' })
    .max(currentYear, { message: `O ano de fabricação não pode ser maior que ${currentYear}.` }),

  imported: z.boolean({
    invalid_type_error: 'O valor para "importado" deve ser verdadeiro ou falso (booleano).'
  }),

  plates: z.string()
    .trim()
    .refine(val => val.length === 8, {
      message: 'A placa deve ter, exatamente, 8 caracteres.'
    }),

  selling_date:
    z.coerce.date()
    .min(storeOpeningDate, {
      message: 'A data de venda não pode ser anterior à data de abertura da loja (20/03/2020).'
    })
    .max(today, {
      message: 'A data de venda não pode ser futura.'
    })
    .nullish(),

  selling_price:
    z.coerce.number()
    .min(5000, { message: 'O preço de venda deve ser no mínimo R$ 5.000,00.' })
    .max(5000000, { message: 'O preço de venda pode ser no máximo R$ 5.000.000,00.' })
    .nullish()
})

export default Car
