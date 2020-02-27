const zenwrap = require('zenwrap')
const scripts = require('./crypto/lua-scripts.js')

async function run(script, data, keys, seed) {
    // console.log(`SCRIPT «${script}»`)
    return await zenwrap(script, keys, data, {verbose: 0, rngseed: seed})
}

async function random (seed) {
    let trace = await run(scripts.random, null, null, seed)
    return trace[0].json.random
}

async function keypair (seed) {
    let trace = await run(scripts.keypair, null, null, seed)
    return trace[0].json
}

async function sign ({private, public}, message, seed) {
    let data = {private, public, message}
    let trace = await run(scripts.signature, data, null, seed)
    return trace[0].json
}

async function verify ({s, R}, public, message) {
    let data = {s, R, public, message}
    let trace = await run(scripts.verify, data, null)
    return trace[0].json.valid
}

async function signAdaptor ({private, public}, t, T, message, seed) {
    let data = {private, public, t, T, message}
    let trace = await run(scripts.signatureAdaptor, data, null, seed)
    return trace[0].json
}

async function verifyAdaptor ({ss, R, T}, public, message) {
    let data = {ss, R, T, public, message}
    let trace = await run(scripts.verifyAdaptor, data, null)
    return trace[0].json
}

module.exports = { random, keypair, sign, verify, signAdaptor, verifyAdaptor }