-- input
data = JSON.decode(DATA)
s = BIG_from_hex(data.s)
R = ECP_from_hex(data.R)
P = ECP_from_hex(data.public)
m = data.message

valid = verify(s, R, P, m)

print(JSON.encode({
    valid = valid
}))