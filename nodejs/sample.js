'use strict';

const Aerospike = require('aerospike')
const path = require('path')

// Set CA file
// format: <config>, <cert_file>
const caFile = path.join("/folder/here/", "aerospike.ca-v4.crt")

// Set seed nodes
// format <IP>:<PORT>,<IP>:<PORT>,<IP>:<PORT>
let host = "localhost:3000,localhost:3001,localhost:3002";
host = host.split(",").map(host => {
    let item = host.split(":");
    return {
        "addr": item[0],
        "port": parseInt(item[1])
    }
});

// Set username and password
const user = "aerospike_user";
const pass = "aerospike_pass"

// Starting connection
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

client.connect(function (error) {
    if (error) throw error;
});

// **** CODE HERE **** //

// Closing connection
client.close();