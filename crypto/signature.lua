-- input
data = JSON.decode(DATA)
x = BIG_from_hex(data.private)
P = ECP_from_hex(data.public)
m = data.message

s, R = sign(x, P, m)

-- output
print(JSON.encode({
    s = BIG_to_hex(s), -- BIG
    R = ECP_to_hex(R)  -- ECP
}))