const fs = require('fs')
const path = require('path')
const readFile = fn => fs.readFileSync(path.join(__dirname, fn), {encoding: 'utf8'})

const prelude = readFile('prelude.lua')

const load = fn => `${prelude}\n${readFile(fn)}`

const scripts = `
random
keypair
signature
verify
signatureAdaptor
verifyAdaptor
`.trim().split(/\s/)

console.log(`BUNDLING LUA SCRIPTS: ${scripts.join(', ')}`)

const scriptDict = scripts
    .map(s => [s, load(`${s}.lua`)])
    .reduce((acc, [k,v]) => {
        acc[k] = v
        return acc
    }, {})

scriptDict.schnorr = readFile('schnorr.lua')

const jsModuleContent = `/* GENERATED from .lua files, use 'npm run bundle-lua' to rebuild */
module.exports = ${JSON.stringify(scriptDict, null, 2)}
`
const targetFilename = path.join(__dirname, 'lua-scripts.js')
fs.writeFileSync(targetFilename, jsModuleContent, {encoding: 'utf8'})