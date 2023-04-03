import com.aerospike.client.AerospikeClient;
import com.aerospike.client.Host;
import com.aerospike.client.policy.ClientPolicy;
import com.aerospike.client.policy.AuthMode;

Host[] hosts = new Host[] {
    new Host(
        "localhost0", 
        "aerospike_tls", 
        3000
    ),
    new Host(
        "localhost1", 
        "aerospike_tls",
        3001
    ),
    new Host(
        "localhost2",
        "aerospike_tls",
        3002
    ),
};

ClientPolicy policy = new ClientPolicy();
policy.tlsPolicy = new TlsPolicy();

policy.authMode = AuthMode.INTERNAL;
policy.user = "aerospike_user";
policy.password = "aerospike_pass";
policy.maxConnsPerNode = 100;
policy.minConnsPerNode = 1;
policy.maxErrorRate = 100;
policy.connectTimeout = 0;
policy.maxSocketIdle = 0;
policy.timeoutDelay = 0;

AerospikeClient client = new AerospikeClient(policy, hosts);
