- transport layer packet is segment(报文段)， network layer packet is datagram(数据报)。This is done by (possibly) breaking the application messages into smaller chunks
and adding a transport-layer header to each chunk to create the transport-layer segment.

- transport layer protocol has TCP and UDP，TCP is connection-oriented

- Extending host-to-host delivery to process-to-process delivery is called transport-layer multiplexing（多路复用） and demultiplexing（多路分解）

- UDP only provide the process-to-process delivery and error detection service. it's unreliable.

- TCP provide the reliable data transfer,congestion control

- This job of delivering the data in a transport-layer segment to the correct socket is
called demultiplexing. The job of gathering data chunks at the source host from different sockets, encapsulating each data chunk with header information (that will later be used in demultiplexing) to create segments, and passing the segments to the network layer is called multiplexing. 

- Each port number is a 16-bit number, ranging from 0 to 65535. The port numbers ranging from 0 to 1023 are called well-known port numbers and are restricted

- In fact, today’s high-performing Web servers often use only one process, and create a new thread with a new connection socket for each new client connection. (A thread can be viewed as a lightweight subprocess.)

- DNS is an example of an application-layer protocol that typically uses UDP

- The TCP segment has 20 bytes of header overhead in every segment, whereas UDP has only 8 bytes of overhead.

- The UDP header has only four fields,each consisting of two bytes. distination port、source port、 checksum、 length.

- checksum is the send side segment 16-bit words  sum and then 1s complement(The 1s
complement is obtained by converting all the 0s to 1s and converting all the 1s to
0s).

- reliable data transfer protocols based on such retransmission are known as ARQ(Automatic Repeat reQuest) protocols.

- why need the sequence Number? it's when the ACK or NAK is corrupt, the sender need  to retransmission  the packet, nevertheless, the receive is not know the packet is currupt pcket or next packet.

- receiver to send the previous ACK ,the sender know current is not correct receive at the receiver end.

- the deal with the delay is retransmission

-  Two basic approaches toward pipelined error recovery can be identified: Go-Back-N and selective repeat.

- N is often referred to as the window size and the GBN protocol itself as a sliding-window protocol. 

- In our GBN protocol, the receiver discards out-of-order packets. 

- on the selected retransmission , the packet of receive is currupt at receiver, will discard the packet.

- window size must be less than or equal to half the size of the sequence number space for SR protocols.

- that the client first sends a special TCP segment; the server responds with a second special TCP segment;and finally the client responds again with a third special segment. The first
two segments carry no payload, that is, no application-layer data; the third of these segments may carry a payload. Because three segments are sent between the two hosts, this connection-establishment procedure is often referred to as a three-way handshake.

- The maximum amount of data that can be grabbed and placed in a segment is limited by the maximum segment size (MSS). The MSS is typically set by first determining the length of the largest link-layer frame that can be sent by the local sending host (the so-called maximum transmission unit, MTU)

- Both Ethernet and PPP link-layer protocols have an MTU of 1,500 bytes. Thus a typical value of MSS is 1460 bytes. 

- MTU—the largest link-layer frame that can be sent on all links from source to destination 

- the tcp header has 20 byte generally(specify by data offset field precisely). 

    - 2 byte source  port numbers; 
    - 2 byte destination port number; 
    - 4 byte sequence number; 
    - 4 byte acknowledgment number;
    - 4 bits data offset(tcp header length);
    - 6 bits  reserved;
    - 6 bits (from left to right): URG, ACK, PSH, RST, SYN, FIN;
    - 2 byte is recieve window;
    - 2 byte checksum field;
    - 2 byte Urgent Pointer
    ---
    - 2 byte Options 
    - 2 byte Padding

- TCP views data as an unstructured, but ordered, stream of bytes. TCP’s use of
sequence numbers reflects this view in that sequence numbers are over the stream
of transmitted bytes and not over the series of transmitted segments.   The sequence
number for a segment is therefore the byte-stream number of the first byte in the
segment. 

- The acknowledgment number that Host A puts in its segment
is the sequence number of the next byte Host A is expecting from Host B. 

- a TCP connection randomly choose an initial sequence number

- TimeoutInterval = EstimatedRTT + 4 * DevRTT

- TCP provides a flow-control service to its applications to eliminate the possibility
of the sender overflowing the receiver’s buffer

- three-way handshake and close connect

- the SYN flood attack is defense by the syn cookie,the same address syn only allocate one variable.

- Because TCP uses acknowledgments to trigger (or clock) its increase in congestion window size, TCP is said to be self-clocking

- ACKs and loss events serve as implicit signals—and that each TCP sender acts on local information asynchronously from other TCP senders

- The TCP congestion algorithm has three major components: (1) slow start, (2) congestion avoidance, and (3) fast recovery. 

- When a TCP connection begins, the value of cwnd is typically initialized to a small value of 1 MSS 

- In particular, it has been shown that when multiple connections share a common bottleneck, those sessions with a smaller RTT are able
 to grab the available bandwidth at that link more quickly as it becomes free (that is, open their congestion windows faster) and thus will enjoy higher throughput than those connections with larger RTTs.

 - if this new application instead uses 11 parallel TCP connections, then the new application gets an unfair allocation of more than R/2.

 - This form of network-assisted congestion control is known as Explicit Congestion Notification.  

 - the TCP in the receiving host informs the TCP in the sending host of the congestion indication by setting the ECE (Explicit Congestion Notification Echo) bit (see Figure 3.29) in a receiver-to-sender TCP ACK segment. The TCP sender, in turn, reacts to an ACK with an ECE congestion indication by halving the congestion window, as it would react to a lost segment
using fast retransmit, and sets the CWR (Congestion Window Reduced) bit in the header of the next transmitted TCP sender-to-receiver segment