'use strict';

const Aerospike = require('aerospike')
const path = require('path')

// Configure CA file
// format: config,cert_file
const caFile = path.join("/folder/here/", "aerospike.ca-v4.crt")

// Configure seed nodes
// format IP:PORT,IP:PORT,IP:PORT
let host = "localhost:3000/tls_name,localhost:3001/tls_name,localhost:3002/tls_name";
host = host.split(",").map(host => {
    let item = host.split(":");
    let sub_item = item[1].split("/");
    return {
        "addr": item[0],
        "port": parseInt(sub_item[0]),
        "tlsname": sub_item[1]
    }
});

// Configure username and password
const user = "aerospike_user";
const pass = "aerospike_pass"

// Create client
const client = Aerospike.client({
    user: user,
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