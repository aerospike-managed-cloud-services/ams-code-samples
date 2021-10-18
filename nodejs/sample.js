const Aerospike = require('aerospike')
const path = require('path')

// Creating connection
const caFolder = '/Users/jignacio/Documents/Projects/acms-console/deploy/backend/';
const caFile = 'cafile.pem';

const client = Aerospike.client({
    username: "",
    password: "",
    hosts: [
        { addr: "172.17.0.2", port: 6000 },
        { addr: "172.17.0.2", port: 6001 },
        { addr: "172.17.0.2", port: 6002 }
    ],
    tls: {
        enable: true,
        cafile: path.join(caFolder, caFile),
    },
    log: {
        level: Aerospike.log.info
    },
    connTimeoutMs: 1000
});
client.connect(function (error) {
    if (error) throw error;
});

// CODE HERE

// Closing connection
client.close();