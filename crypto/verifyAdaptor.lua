-- input
data = JSON.decode(DATA)

ss = BIG_from_hex(data.ss)
R = ECP_from_hex(data.R)
T = ECP_from_hex(data.T)
P = ECP_from_hex(data.public)
m = data.message

valid = verifyAdaptor(ss, R, T, P, m)

print(JSON.encode({
    valid = valid
}))