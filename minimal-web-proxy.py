import socket

proxy = '0.0.0.0'    # any available network interface
proxyPort = 8080     # any available port: 0
request = open("request.txt", "a")
resource = open("resource.txt", "a")
connectionCount = 0

# establishing Client - Proxy connection
clientListenerSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # creating standard socket
clientListenerSocket.bind((proxy, proxyPort))   # proxy is in host role => bind method for specifying ip and port its accepting connections on

print("listening on " + proxy + ":" + str(proxyPort) + "\n")
print("--------------------------------------------\n")

while True:
    connectionCount += 1
    clientListenerSocket.listen(1)  # Enable socket to accept incoming connections (backlog size 1)
    clientSocket, clientAddr = clientListenerSocket.accept()  # wait till a client connects
    print("Client - Proxy connection established\n" + "client IP: " + str(clientAddr[0]) + "\n" + "client Port: " + str(clientAddr[1]) + "\n")

    # handling the request
    requestData = clientSocket.recv(4096)
    if not requestData:
        clientSocket.close()
        print("no client request")
        continue
    
    request.write("connection Number: " + str(connectionCount) + "\n\n")
    request.write(requestData.decode('utf-8'))
    request.write("\n--------------------------------------------\n\n")
    print("Client request parsed into request.txt\n")
    requestLines = requestData.decode('utf-8').split('\r\n')
    if len(requestLines) < 1:
        clientSocket.close()
        print("empty client request")
        continue

    hostHeader = None
    for line in requestLines:
        if line.startswith('Host: '):
            hostHeader = line[6:]
            break

    hostIP = socket.gethostbyname(hostHeader)
    hostPort = 80

    # establishing Proxy - Host connection and forward request data
    hostSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # creating standard socket
    hostSocket.connect((hostIP, hostPort))  # proxy is in client role => connect method for specifying host and port
    print("Proxy - Host connection established\n" + "host IP: " + str(hostIP) + "\n" + "host Port: " + str(hostPort) + "\n")
    hostSocket.sendall(requestData)     # forward request to host

    # handling the resources
    resourceData = hostSocket.recv(4096)
    if not resourceData:
        hostSocket.close()
        clientSocket.close()
        print("no host resource")
        continue

    rsourceLines = resourceData.decode('utf-8').split('\r\n')
    if len(rsourceLines) < 1:
        print("empty host resource")
        continue
    resource.write("connection Number: " + str(connectionCount) + "\n\n")
    resource.write(resourceData.decode('utf-8'))
    resource.write("\n--------------------------------------------\n\n")
    print("Host resource parsed into resource.txt\n")

    hostSocket.close()
    print("Proxy - Host connection closed\n")

    clientSocket.sendall(resourceData)      # forward resource to client
    clientSocket.close()
    print("Client - Proxy connection closed\n")

    print("--------------------------------------------\n")

