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
policy.user = "YOUR AEROSPIKE USER";
policy.password = "YOUR AEROSPIKE PASSWORD";

AerospikeClient client = new AerospikeClient(policy, hosts);
