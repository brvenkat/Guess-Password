import * as passwordUtil from '../../src/lib/password'
import { partialOf } from 'jest-helpers'

describe('Password Module', () => {
  describe('generate', () => {
    let sessionMock
    let genUniqueStringMock
    let mathMock
    beforeEach(() => {
      sessionMock = partialOf<Express.Session>({})
      genUniqueStringMock = jest.spyOn(passwordUtil, 'generateUniqueString').mockReturnValue('123')
      mathMock = jest.spyOn(Math, 'random').mockReturnValue(0.6)
    })
    afterEach(() => {
      jest.resetAllMocks()
    })
    it('Should generate a valid unique password and store in session ', () => {
      const response = passwordUtil.generate()
      expect(genUniqueStringMock).toHaveBeenCalledWith()
      expect(mathMock).toHaveBeenCalled()
      expect(response).toHaveProperty('hint')
    })
  })
  describe('verify', () => {
    const attempt = '4156'
    const password = '1546'
    it('Should verify password when it is incorrect ', () => {
      const response = passwordUtil.verify(attempt, password)
      const expectedResult = { highlight: [ '6' ], correct: false }
      expect(response).toEqual(expectedResult)
    })
    it('Should verify password when it is correct ', () => {
      const response = passwordUtil.verify('4378', '4378')
      const expectedResult = { highlight: [ '4', '3', '7', '8' ], correct: true }
      expect(response).toEqual(expectedResult)
    })
  })
})