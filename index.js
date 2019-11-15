#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./server');
var debug = require('debug')('express-mysql-rest:server');
var http = require('http');
require("dotenv").config();
var Logger = require("./logger");
var log = new Logger();


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
var io = require('socket.io')(server);

const ChatApplication = require('./models/appModel');
var users = [];
var connections = [];

var allUsers = ChatApplication.getAllusersAsync();
var admin = ChatApplication.adminUserAsync()[0];

io.on('connection', function(socket) {
    /* Set up a disconnect event*/
    socket.on('disconnect', () => {
        io.emit('user-exited', { user: socket.alias });
    });

    /**
     * Listen for when a message has been sent from the Ionic app
     */
    socket.on('add-message', (message) => {
        // Broadcast the message and return a JavaScript map of values
        // for use within the Ionic app
        io.emit('message', { message: message.message, sender: socket.user.name, tagline: socket.user.login, location: "", published: new Date() });
    });



    /**
     * Listen for when an image has been sent from the Ionic app
     */
    socket.on('add-image', (message) => {
        io.emit('message', { image: message.image, sender: socket.user.name, tagline: socket.user.login, location: "", published: new Date() });
    });



    /**
     * Allows the user to join the current chat session
     */
    socket.on('set-alias', (obj) => {
        // Define socket object properties (which we can use with our other
        // Socket.io event listener methods) and return a JavaScript map of
        // values for use within the Ionic app
        //{"id":1,"name":"Yassinos","login":"admin","password":"123456","date_create":"2019-11-14T21:24:40.000Z","role":"admin"}
        socket.user = obj;
        io.emit('alias-added', obj);
    });
});
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            log.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
    log.info('Listening on ' + bind);
}