# Schnorr Crypto

Based on `zenroom`, uses curve `BLS461` from the Millagro library.

The cryptographic schemes are implemented in Lua, see `scripts/*.lua`.

There is a `build.js` script that prepends the contents of `prelude.lua` to
each other script and produces `lua-scripts.js`.

Run `npm run bundle-lua` to update this file.

## API

```js
const S = require('zenroom-schnorr')
```

- `random(rngseed) => hex`
- `keypair(rngseed) => {private, public}`
- `sign(keypair, message, rngseed) => {s, R}`
- `verify(signature, public, message) => bool`

All calls are async/Promise.

### Deterministic behaviour

You can pass a random number generator seed to the functions that use
random numbers (`random`, `keypair`, `sign`) to make them deterministic.

Watch out that you don't generate a keypair with the same nonce.

```js
// must be 256 bytes
const rngseed = '04b0848f3b3b5c62c6867a6fb53d2afbdcc76d9f5d22ad7a35fdb2dbe3122ec2939feb70fb3f5887d51f7dd30461e48d460f0f0e31251f3d5023f7d123ca2947e16aa496f31775b4e509d77bf0d8895b3cca732b4a4b4d34c2195d0d7c3405e78977b5810d9eb7a3e29476ba517efd6d7504b0848f3b3b5c62c6867a6fb53d2afbdcc76d9f5d22ad7a35fdb2dbe3122ec2939feb70fb3f5887d51f7dd30461e48d460f0f0e31251f3d5023f7d123ca2947e16aa496f31775b4e509d77bf0d8895b3cca732b4a4b4d34c2195d0d7c3405e78977b5810d9eb7a3e29476ba517efd6d750d9eb7a3e29476ba0d9eb7a3e29476ba517efd6d75517efd6d756d75d6d6'
```

### Generating a random number

```js
const rnd = await S.random(rngseed)
```

### Creating a keypair

```js
const {private, public} = await S.keypair(rnd)
```

### Signing a message

```js
const m = 'deadbeef'
const {r, R} = await S.sign({private, public}, m, rnd)
```

### Verifying a signature

```js
const isValid = await S.verify({s, R}, public, m)
```

