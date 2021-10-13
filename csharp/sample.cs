
// Creating Connection
ClientPolicy policy = new ClientPolicy();
AerospikeClient client = new AerospikeClient(policy, new Host("172.17.0.2", 6000), new Host("172.17.0.2", 6001), new Host("172.17.0.2", 6002));

// Read record
Key key = new Key("test", "demo", "key1");
Record record = client.Get(null, key);

// Closing Connection
client.Close();
