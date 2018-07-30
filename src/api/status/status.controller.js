const os = require('os')

exports.getCpuInfo = (req, res) => {
  res.json({
    data: os.cpus().map(c => ({
      model: c.model,
      speed: c.speed
    }))
  })
}
