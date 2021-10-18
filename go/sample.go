package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"os"
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

	// Parse seed hosts from format <IP>:<PORT>:<TLS_NAME>,...
	var hosts []*as.Host
	seedHosts := strings.Split(os.Getenv("AEROSPIKE_SEED_HOSTS"), ",")

	for _, host := range seedHosts {
		tokens := strings.Split(host, ":")
		port, _ := strconv.Atoi(tokens[1])
		host := as.NewHost(tokens[0], port)
		host.TLSName = tokens[2]
		hosts = append(hosts, host)
	}

	// Configure TLS
	caFile := "/etc/pki/tls/certs/aerospike.ca-v2.crt"
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

	// Get username and password from environment
	clientPolicy.User = os.Getenv("AEROSPIKE_APP_USER")
	clientPolicy.Password = os.Getenv("AEROSPIKE_APP_PASSWORD")

	// Connect to Aerospike cluster
	client, err := as.NewClientWithPolicyAndHost(clientPolicy, hosts...)
	panicOnError(err)

	fmt.Printf("Connected!\n")

	// PUT YOUR CODE HERE

	client.Close()
}
