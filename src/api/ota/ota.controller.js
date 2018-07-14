const system = require('../../../system')
const repo = system.getRepo()
const rp = require('request-promise')
const fs = require('fs')
const https = require('https')

exports.getApp = (req, res) => {
  let proj = repo.getProject(req.params.project)
  let fileName = proj.url.split('/').pop()
  if(fs.existsSync(`${process.env.PWD}/file/`) === false){
  	fs.mkdirSync(`${process.env.PWD}/file/`)
  }

  let	tempPath = `${process.env.PWD}/file/${fileName}`

  curlUrl(proj.url, tempPath)
  	.then(()=>{
  		res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition" : "attachment; filename=" + fileName});
      	fs.createReadStream(tempPath).pipe(res);
  	})
  	.catch(err=>{
  		res.status(400).json(JSON.stringify(err))
  	})
}

const curlUrl = (uri, dest)=>{
	return new Promise((resolve, reject)=>{
		const file = fs.createWriteStream(dest);
		let request = https.get(uri, response=>{
			console.log(response.statusCode)
			if (response.statusCode === 200) {
				response.pipe(file);
				file.on("finish", () => {
					file.close()
		      resolve()
		    })

		    file.on("error", err => {
		    	fs.unlink(dest);
		    	reject(err.message)
		    });
			} else {
				file.close();
				fs.unlink(dest, () => {});
				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
			}
		})

		request.on("error", err => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err.message);
    });

	})
}
