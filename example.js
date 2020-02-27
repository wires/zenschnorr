const {random, keypair, sign, verify, signAdaptor, verifyAdaptor } = require('.')

async function main () {
    // must be 256 bytes
    let rngseed = '04b0848f3b3b5c62c6867a6fb53d2afbdcc76d9f5d22ad7a35fdb2dbe3122ec2939feb70fb3f5887d51f7dd30461e48d460f0f0e31251f3d5023f7d123ca2947e16aa496f31775b4e509d77bf0d8895b3cca732b4a4b4d34c2195d0d7c3405e78977b5810d9eb7a3e29476ba517efd6d7504b0848f3b3b5c62c6867a6fb53d2afbdcc76d9f5d22ad7a35fdb2dbe3122ec2939feb70fb3f5887d51f7dd30461e48d460f0f0e31251f3d5023f7d123ca2947e16aa496f31775b4e509d77bf0d8895b3cca732b4a4b4d34c2195d0d7c3405e78977b5810d9eb7a3e29476ba517efd6d750d9eb7a3e29476ba0d9eb7a3e29476ba517efd6d75517efd6d756d75d6d6'
    console.log('RNG SEED', rngseed)
    
    // await schnorr(rngseed)
    let m = 'deadbeef'
    
    let rnd1 = await random(rngseed)
    console.log('RANDOM 1', rnd1)
    
    let kp = await keypair(rnd1)
    console.log('KEYPAIR ', kp)
    
    let rnd2 = await random(rnd1)
    console.log('RANDOM 2', rnd2)
    
    let signature = await sign(kp, m, rnd2)
    console.log('SIGNATURE', signature)
    
    let verified = await verify(signature, kp.public, m)
    console.log('VERIFIED', verified)

    let rnd3 = await random(rnd2)
    let OFFSET = await keypair(rnd3)
    let t = OFFSET.private
    let T = OFFSET.public
    let rnd4 = await random(rnd3)
    let signatureA = await signAdaptor(kp, t, T, m, rnd4)
    console.log('ADAPTOR SIGNATURE', signatureA)

    let verifiedA = await verifyAdaptor(signatureA, kp.public, m)
    console.log('ADAPTOR VERIFIED', verifiedA)


    if(!verified) {
        throw new Error('Failed to verify')
    }
}

main()