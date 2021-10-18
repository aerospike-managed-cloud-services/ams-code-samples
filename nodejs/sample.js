'use strict';

const Aerospike = require('aerospike')
const path = require('path')

// Configure CA file
// format: <config>, <cert_file>
const caFile = path.join("/folder/here/", "aerospike.ca-v4.crt")

// Configure seed nodes
// format <IP>:<PORT>,<IP>:<PORT>,<IP>:<PORT>
let host = "localhost:3000,localhost:3001,localhost:3002";
host = host.split(",").map(host => {
    let item = host.split(":");
    return {
        "addr": item[0],
        "port": parseInt(item[1])
    }
});

// Configure username and password
const user = "aerospike_user";
const pass = "aerospike_pass"

// Create client
const client = Aerospike.client({
    username: user,
    password: pass,
    hosts: host,
    tls: {
        enable: true,
        cafile: caFile,
    },
    log: {
        level: Aerospike.log.info
    },
    connTimeoutMs: 1000
});

// Connect to Aerospike cluster
client.connect(function (error) {
    if (error) throw error;
});

// **** CODE HERE **** //

// Closing connection
client.close();