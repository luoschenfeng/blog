# network edge

  - what is internet

    - internet is made up of the software and hardware; device be called host and end system.

  - physical media

    - coaxial cable; copper wire; optical fiber; radio spectrum.

  - segment defferent from packet

    - the sending end system segments the data and adds header bytes to each segment. The resulting packages of information, known as packets in the jargon of computer networks.

  - End systems are connected together by a network of communication links and packet switches

  - the type of package switch

    - routers and link-layer switch; the link-layer switch be use to access networwork;the router use the core of network

  - the end system is connected by internet service provider(ISPs)

  - protocal control the send and receive of information within the internet. the transimission control protocol and internet procotol is most important. The IP protocol specifies the format of the packets that are sent and received among routers and end systems.

  - protocol define the format and the order of message exchanged between two or more network entity. as well as the actions taken on the transmission and/or receipt of a message or other event

  - access network - that network is physical connect the end system to the router on the path of end system to the any other end system

  - prevalent type of access is digital subscriber link(DSL) and cable

  - DSL:the splitter separates the data and telephone signal and forword the data to the DSL modem,the DSL modem translate the data to the telphone signal. DSLAM seprate the data and telepthone signal;translate the telphone signal to the data, forword the data to the internet

  - the cable is the television infrastructure,the coaxial cabal(cable) reach individual house and apartment,the head connect the fiber optics end to neighborhood-level junction.the cable modem terminator system and cable modem conversion the digital and analog signal.

  - FTTH is optic fiber from the CO deriectly to the home

  - link type: 1. DSL(twisted-pair copper wire(电话线)) 2.HFC(fiber optic and coaxical cable(电视线)) 3.FTTH(fiber optic) 4.dial-up 5.satellite(radio spectrum). HFC is asymmetric

  - optic-distribution network are two competing: ANO and PNO,ANO is Ethenet.

  - PNO: each home has the optic network termination(光纤网络端接器，也就是猫), it connected by dedicate fiber optic to the neihtborhood splitter. The splitter combines a number of homes onto a single, shared optical fiber, which connects to an optical line terminator(OLT光纤网络线接器),ONT and OLT conversion between optical and electrical signals.OLT lint router to access network, user use router to link the ONT to access network.

  - LAN(ethenet and wifi ),ethenet users use the twistied-pair copper connect to ethenet switch(校网); wireless LAN (家用路由器wifi), connent to the access point that connected to the enterprise's network(wire network),the user must within the ten of meter of ten access point

  - Physical media fall into two categories: guided media and unguided media(信号被引导和不被引导)

- The wires are twisted together to reduce the electrical interference from similar pairs close by. Typically, a number of pairs are bundled together in a cable by wrapping the pairs in a protective shield. A wire pair constitutes a single communication link.



# the network core

  - use the store-forword-transmission.ignore the propagation delay which is the packet across the link near the light speed,if the link transmission speed is L/R, the end system has L bit and interconnect with destination  use a packets switch, amount of a time L/R elapse,the packet switch receive the entire packet. at the 2L/R second time, the destination receive the entire packet.if the source send 3L bit, the destination received the entire packet need 3L second.(store-forword-transmission delay)

  - one packet from source to destination over a path consisting of N links each of rate R,delay is d = N *(L/R)

  - the packet switch has the multple link attache to it,If an arriving packet needs to be transmitted onto a link butfinds the link busy with the transmission of another packet, the arriving packet must wait in the output buffer. Thus, in addition to the store-and-forward delays, packets suffer output buffer queuing delays

  - when the packet array the packet switch and the output buffer is completly fully with the other packet, the **packet loss** will occur

  - **forword table** map the destination address to outbound link of that router

  - **routing protocols** is used to automatically set the forwording table.

  - **circuit switch** and **packet switch**;

  - A circuit in a link is implemented with either frequency-division multiplexing (FDM) or time-division multiplexing (TDM).

  - FDM, deffent frequency band is used to deffent connect,telephone network frequency is 4khz,each 4khz dedicate one connect;

  - TDM,duration of frame and number of time slot if fixed, each circuit is assigned the same dedicated slot in the revolving TDM frames.so the slot number equal the circuit number,the transmission rate of a circuit is equal the per second the frame number multiply the slot's bit.(frame可以理解为交换器处理的能力，1秒被分割为多少下，就可以向外传送多少次，可以用速率表示，time slot理解为每个线路的宽带)

  - because the PoPs is connect to the lower tier ISP which is exits of the provider ISP, so it not exits of the bottom ISP(access ISP). the costomer ISP can connect to the tier-1 ISP through the PoPs.

  - access network, original network, tier-1 ISPs,mult-homing, peering, PoPs, IXP,

  - The most important of these delays are the nodal processing delay, queuing delay, transmission delay, and propagation delay; together, these delays accumulate to give a total nodal delay.

  - The time required to examine the packet’s header and determine where to direct the packet is part of the processing delay.

  - queue delay depends on the rate at which traffic arrives at the queue(packets/sec), the transmission rate of the link, and the nature of the arriving traffic, that is, whether the traffic arrives periodically or arrives in bursts.(到达队列的速度，离开队列的速度，是否为突然到达)

  - The ratio La/R, called the traffic intensity,  the precede link of the queue, queue, outboard link

  - throughtput depend on the minimum transmission rate along the path between source and client, and also depend on the intervene traffic.

  - deffrent function of  a layer n protocal is implemented at the deffrent layer of the network

- encapsulation

  - translate intervene the packet switch, the link layer switch is implement the link layer and physical layer;the router addition implement the network layer.

- TCP provides a connection-oriented service to its applications. This service includes guaranteed delivery of applicationlayer messages to the destination and flow control (that is, sender/receiver speed matching). TCP also breaks long messages into shorter segments and provides congestion-control mechanism.

- denial-of-service attacks fall into three cotegory:

  - vulnerability attack

  - bandwidth flooding

  - connection flooding

- 
