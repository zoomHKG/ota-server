const os = require('os')

exports.getCpuInfo = (req, res) => {
  res.json({
    data: os.cpus()
  })
}

exports.status = (req, res) => {
  res.json({
    data: 'OK'
  })
}
