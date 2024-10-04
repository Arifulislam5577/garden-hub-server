export const generateCode = (): string => {
  const codeLength = 6
  const digits = '0123456789'
  let code = ''

  for (let i = 0; i < codeLength; i++) {
    const randomDigitIndex = Math.floor(Math.random() * digits.length)
    code += digits[randomDigitIndex]
  }

  return code
}
