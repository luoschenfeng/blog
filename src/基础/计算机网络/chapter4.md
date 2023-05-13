# network layer (data plane)

- network layer component: data plane and control plane

- The Internet’s network layer provides a single service, known as best-effort service

- A high-level view of a generic router architecture is input port; output port; routing processor; swtch fabric.

- the input port’s line-termination function and link-layer processing implement the physical and link layers for that individual input link. The lookup performed in the input port is central to the router’s operation—it is here that the router uses the forwarding table to look up the output port to which an arriving packet will be forwarded via the switching fabric

- The forwarding table is either computed and updated by the routing processor (using a routing protocol to interact with the routing processors in other network routers) or is received from a remote SDN controller

- each priority class typically has its own queue.

- A generalized form of round robin queuing that has been widely implemented in routers is the so-called weighted fair queuing (WFQ) discipline 

- IP protocol version 4 as IPv4

- The IPv4 datagram header format is version; header offset; type of service; datagram length; identifier; flag; fragmentation offset; time to live; protocal; Source and destination IP addresses; option; data

- a value of 6 indicates that the data portion is passed to TCP, while a value of 17 indicates that the data is passed to UDP. 

- For example, Ethernet frames can carry up to 1,500 bytes of data, whereas frames for some wide-area links can carry no more than 576 bytes. The maximum amount of data that a link-layer frame can carry is called the maximum transmission unit (MTU). 

- The solution is to fragment the payload in the IP datagram into two or more smaller IP datagrams, encapsulate each of these smaller IP datagrams in a separate link-layer frame; and send these frames over the outgoing link. Each of these smaller datagrams is referred to as a fragment

- These addresses are typically written in so-called dotted-decimal notation(点分十进制), in which each byte of the address is written in its decimal form and is separated by a period (dot) from other bytes in the address. 

- IP addressing assigns an address to this subnet: 223.1.1.0/24, where the /24 (“slash-24”) notation, sometimes known as a subnet mask,indicates that the leftmost 24 bits of the 32-bit quantity define the subnet address. 

- To determine the subnets, detach each interface from its host or router, creating islands of isolated networks, with interfaces terminating the end points of the isolated networks. Each of these isolated networks is called a subnet

- The Internet’s address assignment strategy is known as Classless Interdomain Routing (CIDR—pronounced cider) 

- The remaining 32-x bits of an address can be thought of as distinguishing among the devices within the organization, all of which have the same network prefix. 

- Host addresses can also be configured manually, but typically this is done using the Dynamic Host Configuration Protocol (DHCP) 

- DHCP task: DHCP server discover; DHCP server offer(s); DHCP request; DHCP ACK.

- Private Address Space: 
    10.0.0.0        -   10.255.255.255  (10/8 prefix)
    172.16.0.0      -   172.31.255.255  (172.16/12 prefix)
    192.168.0.0     -   192.168.255.255 (192.168/16 prefix)

- ipv6 header fixed length is 40 byte.has version; Traffic class; Flow label; next header; hop limit; Source and destination addresses; data.

- match-plus-action forwarding table, known as a flow table in OpenFlow, includes:
   
   A set of header field values to which an incoming packet will be matched. 

   A set of counters 

   A set of actions to be taken 
