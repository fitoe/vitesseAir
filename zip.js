import fs from 'node:fs'
import archiver from 'archiver'

// 确保dist目录存在
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const output = fs.createWriteStream(`dist.zip`)
const archive = archiver('zip', {
  zlib: { level: 9 },
})

output.on('close', () => {
  console.log(`打包完成: ${output.path}`)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
archive.directory('dist/', false)

archive.finalize()
