using System;
using System.IO;
using Aerospike.Client;

namespace Test
{
    public class ConnectionTest
    {
        public static void RunTest()
        {
            // Configure seed nodes
            Host[] hosts = new Host[3];
            hosts[0] = new Host("localhost0/tls_name", 3000);
            hosts[1] = new Host("localhost1/tls_name", 3001);
            hosts[2] = new Host("localhost2/tls_name", 3002);

            // Create policy and configure username and password
            ClientPolicy policy = new ClientPolicy();
            policy.user = "aerospike_user";
            policy.password = "aerospike_pass";
            policy.failIfNotConnected = true;
            policy.maxConnsPerNode = 100;
            policy.minConnsPerNode = 1;
            policy.maxErrorRate = 100;
            policy.maxSocketIdle = 0;

            // Connect to Aerospike cluster
            AerospikeClient client = new AerospikeClient(policy, hosts);

            // Close connection
            client.Close();
        }
    }
}
