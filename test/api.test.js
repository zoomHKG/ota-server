const chai = require('chai')
const chaiHttp = require('chai-http')
const promised = require('chai-as-promised')
const server = require('../system/server')

const expect = chai.expect

chai.should()
chai.use(chaiHttp)
chai.use(promised)

let app
let api
const status = '/api/status'
const repo = '/api/repo'
const ota = '/api/ota'

describe('#API', () => {
  before(() => {
  })
  after(async () => {
    app.stop()
  })
  describe('#loadRepository', () => {
    it('should load repository and start API server', (done) => {
      server
        .then(d => {
          expect(d).to.be.an('object')
          app = d
          api = d.httpServer
          done()
        })
        .catch(err => {
          expect(err).to.not.be.an('object')
          done()
        })
    })
  })
  describe('#status', () => {
    it('should return ok', (done) => {
      chai
        .request(api)
        .get(status)
        .then(res => {
          expect(res).to.have.status(200)
          // chai.assert.isObject(res.body, 'Body should be an Object')
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.eq('OK')
          done()
        })
    })
    it('should return CPU Arrays', (done) => {
      chai
        .request(api)
        .get(`${status}/cpus`)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('#repo', () => {
    it('should return success true', (done) => {
      chai
        .request(api)
        .get(`${repo}/update`)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
    it('should return test project', (done) => {
      chai
        .request(api)
        .get(`${repo}/projects/test`)
        .then(res => {
          expect(res).to.have.status(200)
          // chai.assert.isObject(res.body, 'Body should be an Object')
          expect(res.body).to.be.an('object')
          expect(res.body.data.device).to.be.eq('esp8266')
          done()
        })
    })
  })

  describe('#ota', () => {
    it('should return binary file', (done) => {
      chai
        .request(api)
        .get(`${ota}/test`)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.headers['content-type']).to.include('application/octet-stream')
          done()
        })
    })
  })
})
