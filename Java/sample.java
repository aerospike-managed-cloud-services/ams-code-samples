import com.aerospike.client.AerospikeClient;
import com.aerospike.client.Host;
import com.aerospike.client.policy.ClientPolicy;
import com.aerospike.client.policy.AuthMode;

Host[] hosts = new Host[] {
    new Host(
        "<IP address>", 
        "<TLS name>", 
        <Port>
    ),
    new Host(
        "<IP address>", 
        "<TLS name>", 
        <Port>
    ),
    new Host(
        "<IP address>", 
        "<TLS name>", 
        <Port>
    ),
};

ClientPolicy policy = new ClientPolicy();
policy.tlsPolicy = new TlsPolicy();

policy.authMode = AuthMode.INTERNAL;
policy.user = "YOUR AEROSPIKE USER";
policy.password = "YOUR AEROSPIKE PASSWORD";

AerospikeClient client = new AerospikeClient(policy, hosts);
