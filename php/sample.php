<?php

// Configure seed nodes
// format IP:PORT,IP:PORT,IP:PORT
$aerospike_hosts = "localhost:3000,localhost:3001,localhost:3002";
$seedHosts = explode(',', $aerospike_hosts);
foreach($seedHosts as $item) {
    list($host, $port) = explode(':', $item);
    $hosts[] = [
      'addr'=> $host,
      'port'=> $port
    ];
}

// Configure username and password
$user = "aerospike_user";
$pass = "aerospike_pass";

// Create config
$config = [
  "hosts" => $hosts,
  "user" => $user,
  "pass" => $pass

];

// Connect to Aerospike cluster
$db = new Aerospike($config);

if (!$db->isConnected()) {
  echo "Failed to connect to the Aerospike server [{$db->errorno()}]: {$db->error()}\n";
  exit(1);
}

// ******** CODE HERE ******** //

$db->close();
