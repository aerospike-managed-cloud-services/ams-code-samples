const Aerospike = require('aerospike')

// Creating connection
let client = Aerospike.client({
    username: "",
    password: "",
    hosts: [
        { addr: "172.17.0.2", port: 6000 },
        { addr: "172.17.0.2", port: 6001 },
        { addr: "172.17.0.2", port: 6002 }
    ],
    log: {
        level: Aerospike.log.info
    }
});

client.connect(function (error) {
    if (error) throw error;
});

// Read records
let key = new Aerospike.Key('test', 'demo', 'key1')
client.get(key, function (error, record) {
    if (error) throw error;
    console.log('OK - ', record);
})

// Closing connection
client.close();