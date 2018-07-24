const os = require('os')

exports.getCpuInfo = (req, res) => {
  res.send({
    data: os.cpus()
  })
}

exports.status = (req, res) => {
  res.send({
    data: 'OK'
  })
}
