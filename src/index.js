const express = require('express');
const app = express();
const http = require('http');
const path = require('path')
const port = 5001;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// render static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Socket setup & pass server
io.on('connection', (socket) => {
	console.log('made socket connection', socket.id);

	// Handle chat event
	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

	// Handle broadcast typing event
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	});

});

server.listen(port, () => {
    console.log(`server is listening on *port: ${port}`);
});