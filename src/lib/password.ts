import { times, constant } from 'lodash'

export const generate = () => {
  const password = generateUniqueString()
  const hint = password.split('').sort(randomSort).join('')
  return {
    hint,
    password
  }
}

export const randomSort = () => {
  return Math.random()>.5 ? -1 : 1;
}

export const generateUniqueString = () => {
  const allowedCharacters = '0123456789'
  let usedIndices = times(9, constant(false))
  let password = ''
  let i = 0;
  while (i <=7 ) {
    const randomInt = Math.floor(Math.random() * 10)
    if (usedIndices[randomInt]) {
      continue
    }
    ++i;
    usedIndices[randomInt] = true
    password += allowedCharacters.charAt(randomInt)
  }
  return password
}

export const verify = (attempt: string, password: string) => ({
  highlight: generateHighlight(attempt, password),
  correct: attempt === password
})

export const generateHighlight = (attempt: string, password: string) =>
  attempt.split('')
    .reduce((match, entry, idx) => (entry === password.charAt(idx) ? match.concat([entry]): match), [])
