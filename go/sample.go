package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"time"

	as "github.com/aerospike/aerospike-client-go"
	asl "github.com/aerospike/aerospike-client-go/logger"
)

func panicOnError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	// Enable verbose DEBUG level logging
	asl.Logger.SetLevel(asl.DEBUG)

	// Configure seed nodes
	nodes := "localhost:3000:aerospike_tls,localhost:3000:aerospike_tls,localhost:3000:aerospike_tls"
	var hosts []*as.Host
	seedHosts := strings.Split(nodes, ",")

	for _, host := range seedHosts {
		tokens := strings.Split(host, ":")
		port, _ := strconv.Atoi(tokens[1])
		host := as.NewHost(tokens[0], port)
		host.TLSName = tokens[2]
		hosts = append(hosts, host)
	}

	// Configure TLS
	caFile := "/folder/here/aerospike.ca-v4.crt"
	serverPool := x509.NewCertPool()
	caCert, err := ioutil.ReadFile(caFile)
	serverPool.AppendCertsFromPEM(caCert)

	tlsConfig := &tls.Config{
		RootCAs:                  serverPool,
		PreferServerCipherSuites: true,
	}
	tlsConfig.BuildNameToCertificate()

	// Create a "client policy"
	clientPolicy := as.NewClientPolicy()
	clientPolicy.TlsConfig = tlsConfig
	clientPolicy.Timeout = 30 * time.Second

	// Configure username and password
	clientPolicy.User = "aerospike_user"
	clientPolicy.Password = "aerospike_pass"

	// Connect to Aerospike cluster
	client, err := as.NewClientWithPolicyAndHost(clientPolicy, hosts...)
	panicOnError(err)

	fmt.Printf("Connected!\n")

	// PUT YOUR CODE HERE

	client.Close()
}
