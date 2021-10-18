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
            hosts[0] = new Host("localhost0", 3000);
            hosts[1] = new Host("localhost1", 3001);
            hosts[2] = new Host("localhost2", 3002);

            // Creating policy and configure username and password
            ClientPolicy policy = new ClientPolicy();
            policy.user = "aerospike_user";
            policy.password = "aerospike_pass";
            policy.failIfNotConnected = true;

            AerospikeClient client = new AerospikeClient(policy, hosts);

            client.Close();
        }
    }
}
