const request = require('supertest')
const app = require('../src/App')
import * as password from '../src/lib/password'

describe('App', () => {
  let generateMock
  beforeEach(() => {
    generateMock = jest.spyOn(password, 'generate').mockReturnValue({
      hint: '123',
      password: '213'
    })
  })
  it('Test the generate password request', async () => {
    const response = await request(app).get('/new-password')
    expect(generateMock).toHaveBeenCalledWith()
    expect(response.body).toEqual({
      hint: '123'
    })
  })
  it('Test the verify password request when password is not available for hint', async () => {
    const response = await request(app).get('/verify-password')
    expect(response.status).toEqual(404)
  })
})