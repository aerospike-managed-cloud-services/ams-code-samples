
// Creating Connection
ClientPolicy policy = new ClientPolicy();
AerospikeClient client = new AerospikeClient(policy, new Host("localhost0", 3000), new Host("localhost1", 3001), new Host("localhost2", 3002));

// Closing Connection
client.Close();
