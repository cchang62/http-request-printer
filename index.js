
const http = require('http');

const server = http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})
        console.log({ headers, method, url, body })
        const responseBody = { headers, method, url, body };
        // const responseBody = { body };
        response.write(JSON.stringify(responseBody));
        response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });
}).listen(8080, ()=> {
    console.log(`Server is listening at http://${server.address().address}, \nPort is ${server.address().port}`)
    // console.log('Listening on port ' + server.address().port);
});

// OK // console.log('Server listening:', `http://${server.address().address}:${server.address().port}`);
