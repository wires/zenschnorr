G = ECP.generator()

function BIG_from_hex (h)
    return BIG.new(O.from_hex(h))
end

function ECP_from_hex (h)
    return ECP.new(O.from_hex(h))
end

function ECP_to_hex (pt)
    return hex(pt:octet())
end

function BIG_to_hex (pt)
    return hex(pt:octet())
end

-- hash : ECP * ECP * HEX -> BIG
function hashHex(h)
    local E = O.from_hex(h)
    local H = HASH.new()
    local eOctets = H:process(E)
    return BIG.mod(BIG.new(eOctets), ECP.order())
end

-- hash : ECP * ECP * HEX -> BIG
function hash(R, P, m)
    return hashHex(hex(R) .. hex(P) .. m)
end

function keypair()
    local x = BIG.random()
    local P = ECP.mul(G, x)
    return x, P
end

-- sign : BIG * ECP * HEX -> BIG * ECP
function sign(x, P, m)
    -- pick a random nonce
    local r = BIG.random()
    local R = ECP.mul(G, r)
    local e = hash(R, P, m)
    local s = BIG.sub(BIG.mul(x, e), r)
    return s, R
end

-- verify : BIG * ECP * ECP * HEX -> BOOL * ECP * ECP
function verify(s, R, P, m)
    local sG = ECP.mul(G, s)
    local e = hash(R, P, m)
    local ReP = ECP.sub(ECP.mul(P, e), R)
    return (sG == ReP)
end

function hashAdaptor(R, T, P, m)
    -- local RT = ECP.add(R, T)
    return hashHex(hex(R) .. hex(T) .. hex(P) .. m)
end

-- signAdaptop : BIG * ECP * BIG * ECP * HEX -> BIG * ECP
function signAdaptor(x, P, t, T, m)
    -- pick a random nonce
    local r = BIG.random()
    local R = ECP.mul(G, r)
    local e = hashAdaptor(R, T, P, m)
    local s_ = BIG.sub(BIG.mul(x, e), BIG.add(r, t))
    return s_, R, T
end

-- verify : BIG * ECP * ECP * HEX -> BOOL * ECP * ECP
function verifyAdaptor(ss, R, T, P, m)
    local ssG = ECP.mul(G, ss)
    local e = hashAdaptor(R, T, P, m)
    local RTeP = ECP.sub(ECP.mul(P, e), ECP.add(R, T))
    return (ssG == RTeP)
end