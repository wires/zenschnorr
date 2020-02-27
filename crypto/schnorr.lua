G = ECP.generator()

function BIG_from_hex (h)
    return BIG.new(O.from_hex(h))
end

function ECP_from_hex (h)
    return ECP.new(O.from_hex(h))
end

data = JSON.decode(DATA)
PPP = ECP_from_hex(data.public)
print(JSON.encode({public = data.public, private = data.private, PPP = hex(PPP)}))

-- x = BIG.random()

x = BIG_from_hex(data.private)
P = ECP.mul(G, x)
PP = ECP_from_hex(data.public)
-- P = ECP_from_hex(data.public)

-- hash : ECP * ECP * HEX -> BIG
function hash(R, P, m)
    local E = O.from_hex(hex(R) .. hex(P) .. m)
    local H = HASH.new()
    local eOctets = H:process(E)
    return BIG.mod(BIG.new(eOctets), ECP.order())
end

m = 'deadbeef'

-- sign : BIG * ECP * HEX -> BIG * ECP
function sign(x, P, m)
    -- pick a random nonce
    local r = BIG.random()
    local R = ECP.mul(G, r)
    local e = hash(R, P, m)
    local s = BIG.sub(BIG.mul(x, e), r)

    return s, R
end

function verify(s, R, P, m)
    sG = ECP.mul(G, s)
    e = hash(R, P, m)
    ReP = ECP.sub(ECP.mul(P, e), R)
    return (sG == ReP)
end


x2 = BIG.new(O.from_hex(hex(x)))
P2 = ECP.new(O.from_hex(hex(P)))

s, R = sign(x2, P2, m)

s2 = BIG.new(O.from_hex(hex(s)))
R2 = ECP.new(O.from_hex(hex(R)))

valid = verify(s2, R2, P2, m)

result = {
    s = hex(s),
    -- e = e,
    m = m,
    x = hex(x),
    -- k = k,
    P = hex(P),
    PP = hex(PP),
    data = data.public,
    -- G = G,
    -- sG = sG,
    -- ReP = ReP,
    valid = valid
}

print(JSON.encode(result))