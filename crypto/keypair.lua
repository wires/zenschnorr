-- keypair
x, P = keypair()

-- output
print(JSON.encode({
    private = BIG_to_hex(x), -- BIG
    public = ECP_to_hex(P)   -- ECP
}))