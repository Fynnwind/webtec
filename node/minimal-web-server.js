const http = require('node:http');

const hostname1 = 'web1.local';
const hostname2 = 'web2.local';
const port = 8080;

const server = http.createServer((req, res) => {
    // Extract the host from the request headers
    const host = req.headers.host || '';

    if (host.includes(hostname1)) {
        // Handle requests for web1.local
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello from web1.local\n');
    } else if (host.includes(hostname2)) {
        // Handle requests for web2.local
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello from web2.local\n');
    } else {
        // Default response for unrecognized hosts
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('no virtual host\n');
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
