import socket

HOST, PORT = '', 8090

listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)       # create standard socket (OS provides standard communication endpoint)
listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)     # manipulate socket at api level to prevent an error
                                                                        # the SO_REUSEADDR flag tells the kernel to reuse a
                                                                        # local socket in TIME_WAIT state, without waiting for
                                                                        # its natural timeout to expire
listen_socket.bind((HOST, PORT))    # When a socket is created with socket(2), it exists in a name space (address family) but has no
                                    # address assigned to it.  bind() assigns the address specified by addr to the socket
listen_socket.listen(1)     # Enable a server to accept connections it specifies the number of unaccepted connections that the system
                            # will allow before refusing new connections
print(f'Serving HTTP on port {PORT} ...')
while True:
    client_connection, client_address = listen_socket.accept()  # Accept a connection. The socket must be bound to an address and
                                                                # listening for connections. The return value is a pair (conn, address)
                                                                # where conn is a new socket object usable to send and receive data on
                                                                # the connection, and address is the address bound to the socket on the
                                                                # other end of the connection.
    request_data = client_connection.recv(1024)     # Receive data from the socket. The return value is a bytes object representing the
                                                    # data received. The maximum amount of data to be received at once is specified by bufsize.
    print(request_data.decode('utf-8')) # parse HTTP header

    http_response = b"""\
HTTP/1.1 200 OK

Hello, World!
"""
    client_connection.sendall(http_response)    # Send data to the socket. The socket must be connected to a remote socket.
#   client_connection.close()                   # Close connection

# To connect to the webserver use 'telnet localhost 8090' then type the get http request 'GET HTTP/1.1'
# Alternitively go to your webbrowser and type the URL 'localhost:8080' 