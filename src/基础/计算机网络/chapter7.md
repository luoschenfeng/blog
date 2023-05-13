# wireless and mobile network

- When a mobile host moves beyond the range of one base station and into the range of another, it will change its point of attachment into the larger network

- The signal-to-noise ratio (SNR) is a relative measure of the strength of the received signal (i.e., the information being transmitted) and this noise. is twenty times the ratio of the base-10 logarithm of the amplitude of the received signal to the amplitude of the noise. 

- Dynamic selection of the physical-layer modulation technique can be used to adapt the modulation technique to channel conditions. The SNR (and hence the BER) may change as a result of mobility or due to changes in the environment. Adaptive modulation and coding are used in cellular data systems and in the 802.11 WiFi and 4G cellular data networks 

- bit error rate (BER)

- In a CDMA protocol, each bit being sent is encoded by multiplying the bit by a signal (the code) 

- 802.11 standards  all use the same medium access protocol CSMA/CA at IEEE 802.11 (“WiFi”) family

- The fundamental building block of the 802.11 architecture is the basic service set (BSS)

- When a network administrator installs an AP, the administrator assigns a one-or two-word Service Set Identifier (SSID) to the access point(wifi name). 

- 802.11 operates in the frequency range of 2.4 GHz to 2.4835 GHz. Within this 83.5 MHz band, 802.11 defines 13(is 11?) partially overlapping channels.frequency spectrum is 22Mhz generally,1, 6, and 11 is the only set of three non-overlapping channels. rate id 11Mbps(0.5bit/s/hz)

- The 802.11 standard requires that an AP periodically send beacon frames, each of which includes the AP’s SSID and MAC address. 

- The process of scanning channels and listening for beacon frames is known as passive scanning. A wireless device can also perform active scanning, by broadcasting a probe frame that will be received by all APs within the wireless device’s range, as shown in Figure。

- This random access protocol is referred to as CSMA with collision avoidance, or more succinctly as CSMA/ CA. 

- the two MAC protocols have important differences. First, instead of using collision detection, 802.11 uses collision-avoidance techniques. Second, because of the relatively high bit error rates of wireless channels, 802.11 (unlike Ethernet) uses a link-layer acknowledgment/retransmission (ARQ) scheme. 

- 802.11 MAC protocol uses link-layer acknowledgments. when the destination station receives a frame that passes the CRC, it waits a short period of time known as the Short Inter-frame Spacing (SIFS) and then sends back an acknowledgment frame.

- protocol allows a station to use a short Request to Send (RTS) control frame and a short Clear to Send (CTS) control frame to reserve access to the channel


- wireless LAN  Although the field is permitted to be as long as 2,312 bytes, it is typically fewer than 1,500 bytes, holding an IP datagram or an ARP packet

- To understand address 3, recall that the BSS (consisting of the AP and wireless stations) is part of a subnet, and that this subnet connects to other subnets via some router interface. Address 3 contains the MAC address of this router interface

- When the Ethernet frame arrives at the AP, the AP converts the 802.3 Ethernet frame to an 802.11 frame before transmitting the frame into the wireless channel. The AP fills in address 1 and address 2 with H1’s MAC address and its own MAC address, respectively, as described above. For address 3, the AP inserts the MAC address of R1. In this manner, H1 can determine (from address 3) the MAC address of the router interface that sent the datagram into the subnet

- If a node sends two frames in a row without receiving an acknowledgment (an implicit indication of bit errors on the channel), the transmission rate falls back to the next lower rate. If 10 frames in a row are acknowledged, or if a timer that tracks the time since the last fallback expires, the transmission rate increases to the next higher rate. 

- an AP typically sends a beacon frame every 100 msec

- 802.15.1 networks operate in the 2.4 GHz unlicensed radio band in a TDM manner, with time slots of 625 microseconds(nanosecond?1600 time). During each time slot, a sender transmits on one of 79 channels, with the channel changing in a known but pseudo-random manner from slot to slot

- The master node truly rules the piconet—its clock determines time in the piconet, it can transmit in each odd-numbered slot, and a slave can transmit only after the master has communicated with it in the previous slot and even then the slave can only transmit to the master. In addition to the slave devices, there can also be up to 255 parked devices in the network. These devices cannot communicate until their status has been changed from parked to active by the master node.

-  The 4G systems being deployed today are based on LTE technology

- cellular refers to the fact that the region covered by a cellular network is partitioned into a number of geographic coverage areas, known as cells

- 3G: leave the existing core GSM cellular voice network untouched, adding additional cellular data functionality in parallel to the existing cellular voice network. 

- 3G use CDMA technique known as Direct Sequence Wideband CDMA within TDMA slots or FDMA,

- 4G A unified, all-IP network architecture; A clear separation of the 4G data plane and 4G control plane;A clear separation between the radio access network, and the all-IP-core network.

- LTE uses a combination of frequency division multiplexing and time division multiplexing on the downstream channel, known as orthogonal frequency division multiplexing(OFDM) 

- mobility transform id indirect and direct.

- mobile ip: Agent discovery;Registration with the home agent;Indirect routing of datagrams.

- In GSM terminology, the mobile users’s home network is referred to as the mobile user’s home public land mobile network (home PLMN). 