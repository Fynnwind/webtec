const http = require('http');

const PORT = 80;

const server = http.createServer((clientReq, clientRes) => {
    // Define options for the request to the target server
    const options = {
        hostname: clientReq.headers.host.split(':')[0],  // Extract the hostname from the request
        port: clientReq.headers.host.split(':')[1] || 80, // Extract the port if available, default to 80
        path: clientReq.url,
        method: clientReq.method,
        headers: clientReq.headers
    };

    // Make a request to the target server
    const proxyReq = http.request(options, (proxyRes) => {
        clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(clientRes, {
            end: true
        });
    });

    // Handle errors
    proxyReq.on('error', (err) => {
        console.error('Proxy request error:', err);
        clientRes.writeHead(500, { 'Content-Type': 'text/plain' });
        clientRes.end('Proxy request error');
    });

    // Pipe the client request body to the proxy request (if any)
    clientReq.pipe(proxyReq, {
        end: true
    });
});

server.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
