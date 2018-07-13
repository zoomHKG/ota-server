module.exports = {
  development: {
    port: process.env.PORT || 4000,
    ip: '0.0.0.0'
  },
  production: {
    port: process.env.PORT,
    ip: '0.0.0.0'
  }
}
