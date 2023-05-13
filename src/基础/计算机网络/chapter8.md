# Security in Computer Networks

- There are two broad classes of symmetric encryption techniques: stream ciphers and block ciphers

- RSA algorithm (a mod n)^d mod n = a^d mod n,and (m^d mod n)^e mod n = m^de mod n = m^ed mod n =(m^e mod n)^d mod n

- hash algorithm: MD5, SHE.MD5 computes a 128-bit hash 

- MACs  popular standard is HMAC actually runs data and the authentication key through the hash function twice 

- Binding a public key to a particular entity is typically done by a Certification Authority (CA).whose job is to validate identities and issue certificates. 

- The certificate contains the public key and globally unique identifying information about the owner of the public key (for example, a human name or an IP address)

- end-point authentication use the nonce,

- the PGP software uses MD5 or SHA for calculating the message digest; CAST, triple-DES, or IDEA for symmetric key encryption; and RSA for the public key encryption
 
- Secure Sockets Layer (SSL). A slightly modified version of SSL version 3, called Transport Layer Security (TLS), has been standardized by the IETF 

- MS(master secret) to generate four keys: The two encryption keys will be used to encrypt data; the two MAC keys will be used to verify the integrity of the data.

- From the list, the server chooses a symmetric algorithm (for example, AES), a public key algorithm (for example, RSA with a specific key length), and a MAC algorithm. It sends back to the client its choices, as well as a certificate and a server nonce.

- By including such a field, if Alice were to receive a TCP FIN before receiving a closure SSL record, she would know that something funny was going on

- nonces are used to defend against the “connection replay attack” and sequence numbers are used to defend against replaying individual packets during an ongoing session

- use IPsec to create virtual private networks (VPNs) 

- IPsec protocol suite, there are two principal protocols: the Authentication Header (AH) protocol and the Encapsulation Security Payload (ESP) protocol.The AH protocol provides source authentication and data integrity but does not provide confidentiality. The ESP protocol provides source authentication, data integrity, and confidentiality

- the source and destination entities create a network-layer logical connection. This logical connection is called a security association (SA). 

- ESP trailer consists of three fields: padding; pad length; and next header

- Wired Equivalent Privacy (WEP)

- IDS systems are broadly classified as either signature-based systems or anomaly-based systems. 
