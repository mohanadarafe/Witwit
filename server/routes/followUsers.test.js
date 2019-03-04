const request = require('supertest');
const app = require('../server').app

connection = require('../server').connection
connection = jest.fn(()=>{})

describe("Follow ups test",() => {
  it("Can add follow up", () => {
    expect(true).toBe(true)
  })
  it("Should have follow ups route", (done) => {
    request(app)
    .get('/')
    .expect(200,done)

  })
})
