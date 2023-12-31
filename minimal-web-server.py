import socket

HOST, PORT = '', 8090

listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)       # create standard socket (OS provides standard communication endpoint)
listen_socket.bind((HOST, PORT))                                        # bind assigns ip adress and port to the socket
listen_socket.listen(1)                                                 # Enable socket to accept incoming connections (backlog size 1)

print(f'Serving HTTP on port {PORT} ...')
while True:
    client_connection, client_address = listen_socket.accept()  # wait till client connects (opens a new soccet client_connection)
    request_data = client_connection.recv(1024)                 # get received data and specify buffer size
    print(request_data.decode('utf-8'))                         # parse HTTP header

    # Hardcoded HTML content
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Simple HTML Page</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>This is a simple hardcoded HTML page sent over a socket.</p>
    </body>
    </html>
    """
    
    # HTTP response headers
    response_headers = {
        "Content-Type": "text/html",
        "Content-Length": str(len(html_content))
    }
    
    # Construct the HTTP response
    response = "HTTP/1.1 200 OK\r\n"
    for header, value in response_headers.items():
        response += f"{header}: {value}\r\n"
    response += "\r\n"  # End of headers
    response += html_content
    
    # Send the HTTP response over the socket using sendall
    client_connection.sendall(response.encode('utf-8'))
    client_connection.close()
