# link layer

- link layer service Framing; Link access; Reliable delivery; Error detection and correction.

- Error detection in the link layer is usually more sophisticated and is implemented in hardware. 

- the link layer is implemented in a network adapter, also sometimes known as a network interface card (NIC). 

- three techniques for detecting errors in the transmitted data — parity checks; checksumming check and cyclic redundancy checks.

- The ability of the receiver to both detect and correct errors is known as forward error correction (FEC). 

- R = remainder <sup>D * 2r</sup>/<sub>G</sub>，This equation tells us that if we divide D * 2r by G, the value of the remainder is precisely R

- A point-to-point link consists of a single sender at one end of the link and a single receiver at the other end of the link. Many link-layer protocols have been designed for point-to-point links; the point-to-point protocol (PPP) and high-level data link control (HDLC) are two such protocols. The second type of link, a broadcast link, can have multiple sending and receiving nodes all connected to the same, single, shared broadcast channel.

- multiple access protocol as belonging to one of three categories: channel partitioning protocols, random access protocols, and taking-turns protocols. 

- When there is a collision, each node involved in thecollision repeatedly retransmits its frame (that is, packet) until its frame gets through without a collision. 

- These two rules are embodied in the family of carrier sense multiple access (CSMA) and CSMA with collision detection (CSMA/CD) protocols.

- Specifically, when transmitting a frame that has already experienced n collisions, a node chooses the value of K at random from {0,1,2, . . . . 2n -1}. Thus, the more collisions experienced by a frame, the larger the interval from which K is chosen. For Ethernet, the actual amount of time a node waits is K * 512 bit times (i.e., K times the amount of time needed to send 512 bits into the Ethernet) and the maximum value that n can take is capped at 10.

- A linklayer address is variously called a LAN address, a physical address, or a MAC address

- the MAC address is 6 bytes long, giving 248 possible MAC addresses. 

- Filtering is the switch function that determines whether a frame should be forwarded to some interface or should just be dropped. Forwarding is the switch function that determines the interfaces to which a frame should be directed, and then moves the frame to those interfaces. Switch filtering and forwarding are done with a switch table

- The VLAN tag itself consists of a 2-byte Tag Protocol Identifier (TPID) field (with a fixed hexadecimal value of 81-00), a 2-byte Tag Control Information field that contains a 12-bit VLAN identifier field, and a 3-bit priority field that is similar in intent to the IP datagram TOS field.
