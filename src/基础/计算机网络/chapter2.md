- modern aplication architecture is client-server and peer to peer

- application communication is the process communication

- In the context of a communication session between a pair of processes, the process that initiates the communication (that is, initially contacts the other process at the beginning of the session) is labeled as the client. The process that waits to be contacted to begin the session is the server

- a socket is the interface between the application layer and the transport layer within a host.

- the host is identified by its IP address. the process is identified by its port number.

- transport service provide tcp and udp

- the tcp link provide the connection-oriented service and the reliable data transfer

- tcp congestion throttle the traffic when the link is congest;also fair to share the link

- udp don't need the handshake

- ssl is the enhance tcp ,implemented on the application layer, ssl has the socket api is similar  the traditional tcp socket api.

- an application-layer protocol defines

  - The types of messages exchanged, for example, request messages and response messages

  - The syntax of the various message types, such as the fields in the message and how the fields are delineated

  - The semantics of the fields, that is, the meaning of the information in the fields

  - Rules for determining when and how a process sends messages and responds to messages

- how to identify the client and server

- http is a stateless connection

- should each request/response pair be sent over a separate TCP connection, or should all of the requests and their corresponding responses be sent over the same TCP connection? In the former approach, the application is said to use non-persistent connections; and in the latter approach, persistent connections.

- http can use the both persistent and no-persistent connection,default is the persistent connection,can config use the no-persistent connect

- most browsers open 5 to 10 parallel TCP connections

- round-trip time (RTT), which is the time it takes for a small packet to travel from client to server and then back to the client.

- Typically, the HTTP server closes a connection when it isn’t used for a certain time (a configurable timeout interval)

- These requests for objects can be made back-to-back, without waiting for replies to pending requests (pipelining).

- The HEAD method is similar to the GET method. When a server receives a request with the HEAD method, it responds with an HTTP message but it leaves out the requested object. Application developers often use the HEAD method for debugging. The PUT method is often used in conjunction with Web publishing tools. It allows a user to upload an object to a specific path (directory) on a specific Web server. The PUT method is also used by applications that need to upload objects to Web servers. The DELETE method allows a user, or an application, to delete an object on a Web server.

- request is consist of the request line、header line、entity body. response is consist of the status line、header line、entity body

- user wants to read a message, his user agent retrieves the message from his mailbox in his mail server. user has a mailbox located in one of the mail servers.

- Alice’s server holds the message in a message queue and attempts to transfer the message later. Reattempts are often done every 30 minutes or so; if there is no success after several days, the server removes the message and notifies the sender (Alice) with an e-mail message.

- mail from sender's server to the recipient's server  use the SMTP

- mail access protocols, including Post Office Protocol—Version3 (POP3), Internet Mail Access Protocol (IMAP), and HTTP.

- SMTP 25 use tcp, POP3 110 use tcp

- domain name system (DNS) use UDP at port 53

- DNS can implement the load distribution

- three DNS class: root DNS; top-level DNS; authoritative DNS;

- local dns server send query message to the three DNS class

- for each of her neighbors,Alice continually measures the rate at which she receives bits and determines the four peers that are feeding her bits at the highest rate. She then reciprocates by sending chunks to these same four peers. Every 10 seconds, she recalculates the rates and possibly modifies the set of four peers.

- CDNs can instead perform periodic real-time measurements of delay and loss performance between their clusters and clients

- 
