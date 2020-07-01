const appName = "manladag-ui"
const platform = process.platform
const Path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
let appDir = ''
let appCache = ''

switch(platform) {
    case 'linux':
        appDir = Path.join(process.env["HOME"],'.config',appName)
        appCache = Path.join(process.env["HOME"],'.cache',appName)
        break
}

function install() {
    rimraf(appDir, () => {
        rimraf(appCache, () => {
            [appCache, appDir].forEach((e) => {
                fs.mkdirSync(e)
            })
        })
    })
}
install()