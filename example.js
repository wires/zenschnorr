const {random, keypair, sign, verify} = require('.')

async function main () {
    // must be 256 bytes
    let rngseed = '04b0848f3b3b5c62c6867a6fb53d2afbdcc76d9f5d22ad7a35fdb2dbe3122ec2939feb70fb3f5887d51f7dd30461e48d460f0f0e31251f3d5023f7d123ca2947e16aa496f31775b4e509d77bf0d8895b3cca732b4a4b4d34c2195d0d7c3405e78977b5810d9eb7a3e29476ba517efd6d7504b0848f3b3b5c62c6867a6fb53d2afbdcc76d9f5d22ad7a35fdb2dbe3122ec2939feb70fb3f5887d51f7dd30461e48d460f0f0e31251f3d5023f7d123ca2947e16aa496f31775b4e509d77bf0d8895b3cca732b4a4b4d34c2195d0d7c3405e78977b5810d9eb7a3e29476ba517efd6d750d9eb7a3e29476ba0d9eb7a3e29476ba517efd6d75517efd6d756d75d6d6'

    // await schnorr(rngseed)
    let m = 'deadbeef'

    let rnd1 = await random(rngseed)
    let kp = await keypair(rnd1)
    let rnd2 = await random(rnd1)
    let signature = await sign(kp, m, rnd2)
    let verified = await verify(signature, kp.public, m)

    console.log('RNG SEED', rngseed)
    console.log('RANDOM 1', rnd1)
    console.log('RANDOM 2', rnd2)
    console.log('KEYPAIR ', kp)
    console.log('SIGNATURE', signature)
    console.log('VERIFIED', verified)

    if(!verified) {
        throw new Error('Failed to verify')
    }
}

main()