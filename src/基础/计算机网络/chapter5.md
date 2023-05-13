# network layer (control plane)

- forwarding and flow tables are computed

  Per-router control(OSPF and BGP)

  Logically centralized control(flow table)

- routing algorithms, whose goal is to determine good paths (equivalently, routes), from senders to receivers

- least cost path is also the shortest path 

  - A centralized routing algorithm computes the least-cost path between a source and destination using complete, global knowledge about the network

  - In a decentralized routing algorithm, the calculation of the least-cost path is carried out in an iterative, distributed manner by the routers. 

- routing algorithm: LS(centralized), DS(decentralized ), 

- autonomous systems (ASs), with each AS consisting of a group of routers that are under the same administrative control. 

- The routing algorithm running within an autonomous system is called an intra-autonomous system routing protocol.

- OSPF advertisements are contained in OSPF messages that are carried directly by IP, with an upper-layer protocol of 89 for OSPF

- Since an inter-AS routing protocol involves coordination among multiple ASs,communicating ASs must run the same inter-AS routing protocol. In fact, in the Internet, all ASs run the same inter-AS routing protocol, called the Border Gateway Protocol, more commonly known as BGP 

- OSPF use LS, BGP use DV.

- For each AS, each router is either a gateway router or an internal router. A gateway router is a router on the edge of an AS that directly connects to one or more routers in other ASs. An internal router connects only to hosts and routers within its own AS

- pairs of routers exchange routing information over semi-permanent TCP connections using port 179

- each BGP route is written as a list with three components: NEXT-HOP; AS-PATH; destination prefix.(eg: IP address of leftmost interface for router 2a; AS2 AS3; x)

- The AS-PATH attribute contains the list of ASs through which the

- The NEXT-HOP is the IP address of the router interface that begins the AS-PATH

- Route-Selection Algorithm: local preference, AS-PARH, NEXT-HOP, BGP identifiers 

- In particular X will function as an access ISP network if it advertises (to its neighbors B and C) that it has no paths to any other destinations except itself

- the SDN control plane divides broadly into two components—the SDN controller and the SDN network-control applications. 

- SDN control plane has A communication layer: communicating between the SDN controller and controlled network devices; A network-wide state-management layer; 

- OpenFlow protocol operates over TCP, with a default port number of 6653,the controller to  DN-controlled switch has functionality send-packet; read-state; modify-state; configuration. DN-controlled switch to the controller has 

- ICMP messages are carried as IP payload,ip header  upper-layer protocol number of 1

- The well-known ping program sends an ICMP type 8 code 0 message to the specified host. The destination host, seeing the echo request, sends back a type 0 code 0 ICMP echo reply

- the SNMP PDU is typically carried in the payload of a UDP datagram. 
