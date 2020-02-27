-- input
data = JSON.decode(DATA)
x = BIG_from_hex(data.private)
P = ECP_from_hex(data.public)
t = BIG_from_hex(data.t)
T = ECP_from_hex(data.T)
m = data.message

ss, R, T = signAdaptor(x, P, t, T, m)

-- output
print(JSON.encode({
    ss = BIG_to_hex(ss),
    R = ECP_to_hex(R),
    T = ECP_to_hex(T)
}))