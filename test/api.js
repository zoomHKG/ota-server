const chai = require('chai')
const chaiHttp = require('chai-http')
const promised = require('chai-as-promised')
const server = require('../system/server')

const expect = chai.expect

chai.should()
chai.use(chaiHttp)
chai.use(promised)

const app = server.httpServer
const status = '/api/status'

// console.log(server)

describe('API Tests', () => {
  before(() => {
  })
  after(async () => {
    server.stop()
  })

  describe('API endpoints /status', () => {
    it('should return ok', (done) => {
      chai
        .request(app)
        .get(status)
        .then(res => {
          expect(res).to.have.status(200)
          // chai.assert.isObject(res.body, 'Body should be an Object')
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.eq('OK')
          done()
        })
    })
  })
})
